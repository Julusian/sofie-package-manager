import * as path from 'path'
import { promisify } from 'util'
import * as fs from 'fs'
import { exec, ChildProcess } from 'child_process'
import { Accessor, AccessorOnPackage } from '@sofie-automation/blueprints-integration'
import { hashObj } from '../../lib/lib'
import { Expectation } from '../../../worker/expectationApi'
import { compareFileVersion, convertStatToVersion } from './lib'
import { TMPCorePackageInfoInterface } from './localWorker'
import { IWorkInProgress, WorkInProgress } from '../../../worker/worker'

const fsStat = promisify(fs.stat)
const fsAccess = promisify(fs.access)

export async function isExpectationReadyToStartWorkingOn(
	exp: Expectation.MediaFileScan
): Promise<{ ready: boolean; reason: string }> {
	const lookupSource = await lookupSources(exp)
	if (!lookupSource.ready) {
		return {
			ready: lookupSource.ready,
			reason: lookupSource.reason,
		}
	}
	const lookupTarget = await lookupTargets(exp)
	if (!lookupTarget.ready) {
		return {
			ready: lookupTarget.ready,
			reason: lookupTarget.reason,
		}
	}

	return {
		ready: true,
		reason: `${lookupSource.reason}, ${lookupTarget.reason}`,
	}
}
export async function isExpectationFullfilled(
	exp: Expectation.MediaFileScan,
	corePackageInfo: TMPCorePackageInfoInterface
): Promise<{ fulfilled: boolean; reason: string }> {
	/** undefined if all good, error string otherwise */
	// let reason: undefined | string = 'Unknown fulfill error'

	const lookupSource = await lookupSources(exp)
	if (!lookupSource.ready) return { fulfilled: false, reason: `Not able to access source: ${lookupSource.reason}` }
	const lookupTarget = await lookupTargets(exp)
	if (!lookupTarget.ready) return { fulfilled: false, reason: `Not able to access target: ${lookupTarget.reason}` }

	const fullPath = lookupSource.foundPath
	// const fullPath = path.join(exp.startRequirement.location.folderPath, exp.startRequirement.content.filePath)

	// try {
	// 	await fsAccess(fullPath, fs.constants.R_OK)
	// 	// The file exists
	// } catch (err) {
	// 	return { fulfilled: false, reason: `File does not exist: ${err.toString()}` }
	// }
	const stat = await fsStat(fullPath)
	const statVersion = convertStatToVersion(stat)

	/** A string that should change whenever the file is changed */
	const fileHash = hashObj(statVersion)

	const storedHash = await corePackageInfo.fetchPackageInfoHash(
		exp.startRequirement.sources[0],
		exp.startRequirement.content,
		exp.startRequirement.version
	)

	if (!storedHash) {
		return { fulfilled: false, reason: 'No Record found' }
	} else if (storedHash !== fileHash) {
		return { fulfilled: false, reason: `Record doesn't match file` }
	} else {
		return { fulfilled: true, reason: 'Record already matches file' }
	}

	// return { fulfilled: false, reason: 'N/A' }
}
export async function workOnExpectation(
	exp: Expectation.MediaFileScan,
	corePackageInfo: TMPCorePackageInfoInterface
): Promise<IWorkInProgress> {
	// Scan the media file

	const lookupSource = await lookupSources(exp)
	if (!lookupSource.ready) throw new Error(`Can't start working due to source: ${lookupSource.reason}`)
	if (!lookupSource.foundPath) throw new Error(`No source path found!`)

	const lookupTarget = await lookupTargets(exp)
	if (!lookupTarget.ready) throw new Error(`Can't start working due to target: ${lookupTarget.reason}`)
	if (!lookupTarget.foundPath) throw new Error(`No target path found!`)

	let ffProbeProcess: ChildProcess | undefined
	const workInProgress = new WorkInProgress(async () => {
		// On cancel
		if (ffProbeProcess) {
			ffProbeProcess.kill() // todo: signal?
		}
	})

	setImmediate(() => {
		;(async () => {
			const startTime = Date.now()
			const fullPath = lookupSource.foundPath
			// const fullPath = path.join( exp.startRequirement.location.folderPath, exp.startRequirement.content.filePath)

			try {
				await fsAccess(fullPath, fs.constants.R_OK)
				// The file exists
			} catch (err) {
				workInProgress._reportError(err.toString())
				return
			}

			const stat = await fsStat(fullPath)
			const statVersion = convertStatToVersion(stat)
			const fileHash = hashObj(statVersion)

			// Use FFProbe to scan the file:
			const args = [
				process.platform === 'win32' ? 'ffprobe.exe' : 'ffprobe',
				'-hide_banner',
				`-i "${fullPath}"`,
				'-show_streams',
				'-show_format',
				'-print_format',
				'json',
			]
			ffProbeProcess = exec(args.join(' '), (err, stdout, _stderr) => {
				// this.logger.debug(`Worker: metadata generate: output (stdout, stderr)`, stdout, stderr)
				ffProbeProcess = undefined
				if (err) {
					workInProgress._reportError(err.toString())
					return
				}
				const json: any = JSON.parse(stdout)
				if (!json.streams || !json.streams[0]) {
					workInProgress._reportError(`File doesn't seem to be a media file`)
					return
				}

				corePackageInfo
					.storePackageInfo(
						exp.startRequirement.sources[0],
						exp.startRequirement.content,
						exp.startRequirement.version,
						fileHash,
						json
					)
					.then(
						() => {
							const duration = Date.now() - startTime
							workInProgress._reportComplete(
								`Scan completed in ${Math.round(duration / 100) / 10}s`,
								undefined
							)
						},
						(err) => {
							workInProgress._reportError(err.toString())
						}
					)
			})
		})().catch((err) => {
			workInProgress._reportError(err.toString())
		})
	})

	// workInProgress._reportError(err)

	return workInProgress
}
export async function removeExpectation(
	exp: Expectation.MediaFileScan,
	corePackageInfo: TMPCorePackageInfoInterface
): Promise<{ removed: boolean; reason: string }> {
	// todo: remove from corePackageInfo
	// corePackageInfo

	await corePackageInfo.removePackageInfo(
		exp.startRequirement.sources[0],
		exp.startRequirement.content,
		exp.startRequirement.version
	)

	return { removed: true, reason: 'Removed scan info from Store' }
}

type LookupResource =
	| { foundPath: string; foundAccessor: AccessorOnPackage.Any; ready: true; reason: string }
	| {
			foundPath: undefined
			foundAccessor: undefined
			ready: false
			reason: string
	  }

/** Check that we have any access to a Package on an source-resource, then return the resource */
async function lookupSources(exp: Expectation.MediaFileScan): Promise<LookupResource> {
	/** undefined if all good, error string otherwise */
	let errorReason: undefined | string = 'No source found'

	// See if the file is available at any of the sources:
	for (const resource of exp.startRequirement.sources) {
		for (const [accessorId, accessor] of Object.entries(resource.accessors)) {
			if (accessor.type === Accessor.AccessType.LOCAL_FOLDER) {
				errorReason = undefined

				const folderPath = accessor.folderPath
				if (!folderPath) {
					errorReason = `Accessor "${accessorId}": folder path not set`
					continue // Maybe next source works?
				}
				const filePath = accessor.filePath || exp.endRequirement.content.filePath
				if (!filePath) {
					errorReason = `Accessor "${accessorId}": file path not set`
					continue // Maybe next source works?
				}

				const fullPath = path.join(folderPath, filePath)

				try {
					await fsAccess(fullPath, fs.constants.R_OK)
					// The file exists
				} catch (err) {
					// File is not readable
					errorReason = `Not able to read file: ${err.toString()}`
				}
				if (errorReason) continue // Maybe next accessor works?

				// Check that the file is of the right version:
				const stat = await fsStat(fullPath)
				errorReason = compareFileVersion(stat, exp.endRequirement.version)

				if (!errorReason) {
					// All good, no need to look further:
					return {
						foundPath: fullPath,
						foundAccessor: accessor,
						ready: true,
						reason: `Can access source "${resource.label}" through accessor "${accessorId}"`,
					}
				}
			} else {
				errorReason = `Unsupported accessor "${accessorId}" type "${accessor.type}"`
			}
		}
	}
	return {
		foundPath: undefined,
		foundAccessor: undefined,
		ready: false,
		reason: errorReason,
	}
}

/** Check that we have any access to a Package on an target-resource, then return the resource */
async function lookupTargets(exp: Expectation.MediaFileScan): Promise<LookupResource> {
	/** undefined if all good, error string otherwise */
	let errorReason: undefined | string = 'No target found'

	// See if the file is available at any of the targets:
	for (const resource of exp.endRequirement.targets) {
		for (const [accessorId, accessor] of Object.entries(resource.accessors)) {
			if (accessor.type === Accessor.AccessType.CORE_PACKAGE_INFO) {
				errorReason = undefined

				if (!errorReason) {
					// All good, no need to look further:
					return {
						foundPath: 'N/A',
						foundAccessor: accessor,
						ready: true,
						reason: `Can access target "${resource.label}" through accessor "${accessorId}"`,
					}
				}
			} else {
				errorReason = `Unsupported accessor "${accessorId}" type "${accessor.type}"`
			}
		}
	}
	return {
		foundPath: undefined,
		foundAccessor: undefined,
		ready: false,
		reason: errorReason,
	}
}

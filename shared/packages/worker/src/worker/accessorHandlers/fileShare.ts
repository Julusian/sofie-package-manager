import { promisify } from 'util'
import fs from 'fs'
import {
	PackageReadInfo,
	PutPackageHandler,
	AccessorHandlerResult,
	SetupPackageContainerMonitorsResult,
} from './genericHandle'
import {
	Accessor,
	AccessorOnPackage,
	Expectation,
	PackageContainerExpectation,
	assertNever,
	Reason,
	stringifyError,
	promiseTimeout,
} from '@sofie-package-manager/api'
import { GenericWorker } from '../worker'
import { WindowsWorker } from '../workers/windowsWorker/windowsWorker'
import networkDrive from 'windows-network-drive'
import { exec } from 'child_process'
import { FileShareAccessorHandleType, GenericFileAccessorHandle } from './lib/FileHandler'
import { MonitorInProgress } from '../lib/monitorInProgress'
import { MAX_EXEC_BUFFER } from '../lib/lib'

const fsStat = promisify(fs.stat)
const fsAccess = promisify(fs.access)
const fsOpen = promisify(fs.open)
const fsClose = promisify(fs.close)
const fsReadFile = promisify(fs.readFile)
const fsWriteFile = promisify(fs.writeFile)
const fsRename = promisify(fs.rename)
const fsUnlink = promisify(fs.unlink)
const pExec = promisify(exec)

const PREPARE_FILE_ACCESS_TIMEOUT = 1000
const PREPARE_FILE_ACCESS_TIMEOUT_INNER = PREPARE_FILE_ACCESS_TIMEOUT * 0.8

/** Accessor handle for accessing files on a network share */
export class FileShareAccessorHandle<Metadata> extends GenericFileAccessorHandle<Metadata> {
	static readonly type = FileShareAccessorHandleType
	private originalFolderPath: string | undefined
	private actualFolderPath: string | undefined

	public disableDriveMapping = false

	private content: {
		/** This is set when the class-instance is only going to be used for PackageContainer access.*/
		onlyContainerAccess?: boolean
		filePath?: string
	}
	private workOptions: Expectation.WorkOptions.RemoveDelay & Expectation.WorkOptions.UseTemporaryFilePath

	constructor(
		worker: GenericWorker,
		accessorId: string,
		private accessor: AccessorOnPackage.FileShare,
		content: any, // eslint-disable-line  @typescript-eslint/explicit-module-boundary-types
		workOptions: any // eslint-disable-line  @typescript-eslint/explicit-module-boundary-types
	) {
		super(worker, accessorId, accessor, content, FileShareAccessorHandle.type)
		this.originalFolderPath = this.accessor.folderPath
		this.actualFolderPath = this.originalFolderPath // To be overwritten later

		// Verify content data:
		if (!content.onlyContainerAccess) {
			if (!content.filePath) throw new Error('Bad input data: content.filePath not set!')
		}
		this.content = content

		if (workOptions.removeDelay && typeof workOptions.removeDelay !== 'number')
			throw new Error('Bad input data: workOptions.removeDelay is not a number!')
		if (workOptions.useTemporaryFilePath && typeof workOptions.useTemporaryFilePath !== 'boolean')
			throw new Error('Bad input data: workOptions.useTemporaryFilePath is not a boolean!')
		this.workOptions = workOptions
	}
	/** Path to the PackageContainer, ie the folder on the share */
	get folderPath(): string {
		const folderPath = this.disableDriveMapping ? this.originalFolderPath : this.actualFolderPath

		if (!folderPath) throw new Error(`FileShareAccessor: accessor.folderPath not set!`)
		return folderPath
	}
	get orgFolderPath(): string {
		const folderPath = this.originalFolderPath

		if (!folderPath) throw new Error(`FileShareAccessor: accessor.folderPath not set!`)
		return folderPath
	}
	/** Full path to the package */
	get fullPath(): string {
		return this.getFullPath(this.filePath)
	}
	static doYouSupportAccess(worker: GenericWorker, accessor0: AccessorOnPackage.Any): boolean {
		const accessor = accessor0 as AccessorOnPackage.FileShare
		return !accessor.networkId || worker.agentAPI.location.localNetworkIds.includes(accessor.networkId)
	}
	checkHandleRead(): AccessorHandlerResult {
		if (!this.accessor.allowRead) {
			return {
				success: false,
				reason: {
					user: `Not allowed to read`,
					tech: `Not allowed to read`,
				},
			}
		}
		return this.checkAccessor()
	}
	checkHandleWrite(): AccessorHandlerResult {
		if (!this.accessor.allowWrite) {
			return {
				success: false,
				reason: {
					user: `Not allowed to write`,
					tech: `Not allowed to write`,
				},
			}
		}
		return this.checkAccessor()
	}
	private checkAccessor(): AccessorHandlerResult {
		if (this.accessor.type !== Accessor.AccessType.FILE_SHARE) {
			return {
				success: false,
				reason: {
					user: `There is an internal issue in Package Manager`,
					tech: `FileShare Accessor type is not FILE_SHARE ("${this.accessor.type}")!`,
				},
			}
		}
		if (!this.originalFolderPath)
			return { success: false, reason: { user: `Folder path not set`, tech: `Folder path not set` } }
		if (!this.content.onlyContainerAccess) {
			if (!this.filePath)
				return { success: false, reason: { user: `File path not set`, tech: `File path not set` } }
		}
		return { success: true }
	}
	async checkPackageReadAccess(): Promise<AccessorHandlerResult> {
		const readIssue = await this._checkPackageReadAccess()
		if (!readIssue.success) {
			if (readIssue.reason.tech.match(/EPERM/)) {
				// "EPERM: operation not permitted"
				if (this.accessor.userName) {
					// Try resetting the access permissions:
					await this.prepareFileAccess(true)

					// Try now:
					return this._checkPackageReadAccess()
				}
			} else {
				return readIssue
			}
		}
		return { success: true }
	}
	async tryPackageRead(): Promise<AccessorHandlerResult> {
		try {
			// Check if we can open the file for reading:
			const fd = await fsOpen(this.fullPath, 'r')

			// If that worked, we seem to have read access.
			await fsClose(fd)
		} catch (err) {
			if (err && (err as any).code === 'EBUSY') {
				return {
					success: false,
					reason: { user: `Not able to read file (file is busy)`, tech: `${stringifyError(err, true)}` },
				}
			} else if (err && (err as any).code === 'ENOENT') {
				return { success: false, reason: { user: `File does not exist`, tech: `${stringifyError(err, true)}` } }
			} else {
				return {
					success: false,
					reason: { user: `Not able to read file`, tech: `${stringifyError(err, true)}` },
				}
			}
		}
		return { success: true }
	}
	private async _checkPackageReadAccess(): Promise<AccessorHandlerResult> {
		await this.prepareFileAccess()

		try {
			await fsAccess(this.fullPath, fs.constants.R_OK)
			// The file exists
		} catch (err) {
			// File is not readable
			return {
				success: false,
				reason: {
					user: `File doesn't exist`,
					tech: `Not able to read file: ${stringifyError(err, true)}`,
				},
			}
		}
		return { success: true }
	}
	async checkPackageContainerWriteAccess(): Promise<AccessorHandlerResult> {
		await this.prepareFileAccess()
		try {
			await fsAccess(this.folderPath, fs.constants.W_OK)
			// The file exists
		} catch (err) {
			// File is not writeable
			return {
				success: false,
				reason: {
					user: `Not able to write to container folder`,
					tech: `Not able to write to container folder: ${stringifyError(err, true)}`,
				},
			}
		}
		return { success: true }
	}
	async getPackageActualVersion(): Promise<Expectation.Version.FileOnDisk> {
		await this.prepareFileAccess()
		const stat = await fsStat(this.fullPath)
		return this.convertStatToVersion(stat)
	}
	async removePackage(): Promise<void> {
		await this.prepareFileAccess()
		if (this.workOptions.removeDelay) {
			await this.delayPackageRemoval(this.filePath, this.workOptions.removeDelay)
		} else {
			await this.removeMetadata()
			await this.unlinkIfExists(this.fullPath)
		}
	}

	async getPackageReadStream(): Promise<{ readStream: NodeJS.ReadableStream; cancel: () => void }> {
		await this.prepareFileAccess()
		const readStream = await new Promise<fs.ReadStream>((resolve, reject) => {
			const rs: fs.ReadStream = fs.createReadStream(this.fullPath)
			rs.once('error', reject)
			// Wait for the stream to be actually valid before continuing:
			rs.once('open', () => resolve(rs))
		})

		return {
			readStream: readStream,
			cancel: () => {
				readStream.close()
			},
		}
	}
	async putPackageStream(sourceStream: NodeJS.ReadableStream): Promise<PutPackageHandler> {
		await this.prepareFileAccess()
		await this.clearPackageRemoval(this.filePath)

		const fullPath = this.workOptions.useTemporaryFilePath ? this.temporaryFilePath : this.fullPath

		// Remove the file if it exists:
		let exists = false
		try {
			await fsAccess(fullPath, fs.constants.R_OK)
			// The file exists
			exists = true
		} catch (err) {
			// Ignore
		}
		if (exists) await fsUnlink(fullPath)

		const writeStream = sourceStream.pipe(fs.createWriteStream(this.fullPath))

		const streamWrapper: PutPackageHandler = new PutPackageHandler(() => {
			// can't really abort the write stream
		})

		// Pipe any events from the writeStream right into the wrapper:
		writeStream.on('error', (err) => streamWrapper.emit('error', err))
		writeStream.on('close', () => streamWrapper.emit('close'))

		return streamWrapper
	}
	async getPackageReadInfo(): Promise<{ readInfo: PackageReadInfo; cancel: () => void }> {
		throw new Error('FileShare.getPackageReadInfo: Not supported')
	}
	async putPackageInfo(_readInfo: PackageReadInfo): Promise<PutPackageHandler> {
		// await this.removeDeferRemovePackage()
		throw new Error('FileShare.putPackageInfo: Not supported')
	}

	async finalizePackage(): Promise<void> {
		if (this.workOptions.useTemporaryFilePath) {
			await this.unlinkIfExists(this.fullPath)
			await fsRename(this.temporaryFilePath, this.fullPath)
		}
	}

	// Note: We handle metadata by storing a metadata json-file to the side of the file.

	async fetchMetadata(): Promise<Metadata | undefined> {
		try {
			await fsAccess(this.metadataPath, fs.constants.R_OK)
			// The file exists

			const text = await fsReadFile(this.metadataPath, {
				encoding: 'utf-8',
			})
			return JSON.parse(text)
		} catch (err) {
			// File doesn't exist
			return undefined
		}
	}
	async updateMetadata(metadata: Metadata): Promise<void> {
		await fsWriteFile(this.metadataPath, JSON.stringify(metadata))
	}
	async removeMetadata(): Promise<void> {
		await this.unlinkIfExists(this.metadataPath)
	}
	async runCronJob(packageContainerExp: PackageContainerExpectation): Promise<AccessorHandlerResult> {
		// Always check read/write access first:
		const checkRead = await this.checkPackageContainerReadAccess()
		if (!checkRead.success) return checkRead

		if (this.accessor.allowWrite) {
			const checkWrite = await this.checkPackageContainerWriteAccess()
			if (!checkWrite.success) return checkWrite
		}

		let badReason: Reason | null = null
		const cronjobs = Object.keys(packageContainerExp.cronjobs) as (keyof PackageContainerExpectation['cronjobs'])[]
		for (const cronjob of cronjobs) {
			if (cronjob === 'interval') {
				// ignore
			} else if (cronjob === 'cleanup') {
				const options = packageContainerExp.cronjobs[cronjob]

				badReason = await this.removeDuePackages()
				if (!badReason && options?.cleanFileAge) badReason = await this.cleanupOldFiles(options.cleanFileAge)
			} else {
				// Assert that cronjob is of type "never", to ensure that all types of cronjobs are handled:
				assertNever(cronjob)
			}
		}

		if (!badReason) return { success: true }
		else return { success: false, reason: badReason }
	}
	async setupPackageContainerMonitors(
		packageContainerExp: PackageContainerExpectation
	): Promise<SetupPackageContainerMonitorsResult> {
		const resultingMonitors: { [monitorId: string]: MonitorInProgress } = {}
		const monitorIds = Object.keys(
			packageContainerExp.monitors
		) as (keyof PackageContainerExpectation['monitors'])[]
		for (const monitorId of monitorIds) {
			if (monitorId === 'packages') {
				// setup file monitor:
				resultingMonitors[monitorId] = this.setupPackagesMonitor(packageContainerExp)
			} else {
				// Assert that cronjob is of type "never", to ensure that all types of monitors are handled:
				assertNever(monitorId)
			}
		}

		return { success: true, monitors: resultingMonitors }
	}
	/** Called when the package is supposed to be in place (or is about to be put in place very soon) */
	async packageIsInPlace(): Promise<void> {
		await this.clearPackageRemoval(this.filePath)
	}

	/** Local path to the Package, ie the File */
	get filePath(): string {
		if (this.content.onlyContainerAccess) throw new Error('onlyContainerAccess is set!')

		const filePath = this.accessor.filePath || this.content.filePath
		if (!filePath) throw new Error(`FileShareAccessor: filePath not set!`)
		return filePath
	}
	/** Full path to a temporary file */
	get temporaryFilePath(): string {
		return this.fullPath + '.pmtemp'
	}
	private get metadataPath() {
		return this.getMetadataPath(this.filePath)
	}
	/**
	 * Make preparations for file access (such as map a drive letter).
	 * This method should be called prior to any file access being made.
	 */
	async prepareFileAccess(forceRemount = false): Promise<void> {
		if (!this.originalFolderPath) throw new Error(`FileShareAccessor: accessor.folderPath not set!`)
		const folderPath = this.originalFolderPath

		let handlingDone = false

		if (!this.disableDriveMapping && this.worker.type === WindowsWorker.type) {
			// On windows, we can assign the share to a drive letter, as that increases performance quite a lot:
			const windowsWorker = this.worker as WindowsWorker

			const STORE_DRIVELETTERS = `fileShare_driveLetters_${this.worker.agentAPI.location.localComputerId}`
			// Note: Use the mappedDriveLetters as a WorkerStorage, to avoid a potential issue where other workers
			// mess with the drive letter at the same time that we do, and we all end up to be unsynced with reality.

			if (!forceRemount) {
				// Fast-path, just read the drive letter from the store:
				// Note: This is a fast path in the case of many jobs fired at several Workers simultaneously,
				// they can all read in parallel from the same store. When doing a .workerStorageWrite(), that is a single-threaded process.

				const mappedDriveLetters: MappedDriveLetters =
					(await this.worker.agentAPI.workerStorageRead<MappedDriveLetters>(STORE_DRIVELETTERS)) ?? {}

				// Check if the drive letter has already been assigned in our cache:
				let foundMappedDriveLetter: string | null = null
				for (const [driveLetter, mountedPath] of Object.entries(mappedDriveLetters)) {
					if (mountedPath === folderPath) {
						foundMappedDriveLetter = driveLetter
					}
				}
				if (foundMappedDriveLetter) {
					// It seems a drive letter is already mapped up.
					this.actualFolderPath = `${foundMappedDriveLetter}:\\`
					handlingDone = true
				}
			}

			if (!handlingDone) {
				await this.worker.agentAPI.workerStorageWrite<MappedDriveLetters>(
					STORE_DRIVELETTERS,
					PREPARE_FILE_ACCESS_TIMEOUT,
					async (mappedDriveLetters0): Promise<MappedDriveLetters> => {
						const mappedDriveLetters: MappedDriveLetters = mappedDriveLetters0 ?? {}
						// First we check if the drive letter has already been assigned in our cache:
						let foundMappedDriveLetter: string | null = null
						for (const [driveLetter, mountedPath] of Object.entries(mappedDriveLetters)) {
							if (mountedPath === folderPath) {
								foundMappedDriveLetter = driveLetter
							}
						}

						if (foundMappedDriveLetter && forceRemount) {
							// Force a re-mount of the drive letter:
							delete mappedDriveLetters[foundMappedDriveLetter]
							await promiseTimeout(
								networkDrive.unmount(foundMappedDriveLetter),
								PREPARE_FILE_ACCESS_TIMEOUT_INNER,
								(timeoutDuration) =>
									`networkDrive.unmount: Timeout after ${timeoutDuration}ms (trying to unmount "${foundMappedDriveLetter}", new network path: "${folderPath}")`
							)

							foundMappedDriveLetter = null
						}

						if (foundMappedDriveLetter) {
							// It seems a drive letter is already mapped up.
							this.actualFolderPath = `${foundMappedDriveLetter}:\\`
							handlingDone = true
						}
						if (!handlingDone) {
							// Update our cache of mounted drive letters:
							for (const [driveLetter, mountedPath] of Object.entries(
								await this.getMountedDriveLetters(`new network path: "${folderPath}")`)
							)) {
								mappedDriveLetters[driveLetter] = mountedPath
								// If the mounted path is the one we want, we don't have to mount a new one:
								if (mountedPath === folderPath) {
									foundMappedDriveLetter = driveLetter
								}
							}
							if (foundMappedDriveLetter) {
								this.actualFolderPath = `${foundMappedDriveLetter}:\\`
								handlingDone = true
							}
						}

						if (!handlingDone) {
							// Find next free drive letter:
							const freeDriveLetter = windowsWorker.agentAPI.config.windowsDriveLetters?.find(
								(driveLetter) => !mappedDriveLetters[driveLetter]
							)

							if (freeDriveLetter) {
								// Try to map the remote share onto a drive:

								try {
									await promiseTimeout(
										networkDrive.mount(
											folderPath,
											freeDriveLetter,
											this.accessor.userName,
											this.accessor.password
										),
										PREPARE_FILE_ACCESS_TIMEOUT_INNER,
										(timeoutDuration) =>
											`networkDrive.mount: Timeout after ${timeoutDuration}ms (trying to mount "${folderPath}" onto drive "${freeDriveLetter}")`
									)
									this.worker.logger.info(
										`networkDrive.mount: Mounted "${folderPath}" onto drive "${freeDriveLetter}"`
									)
								} catch (e) {
									const errStr = `${e}`
									if (
										errStr.match(/invalid response/i) ||
										errStr.match(/Ugyldig svar/i) // "Invalid response" in Norvegian
									) {
										// Temporary handling of the error

										const mappedDrives = await this.getMountedDriveLetters(
											`Handle error "${errStr}" when trying to mount "${folderPath}", new network path: "${folderPath}")`
										)

										if (mappedDrives[freeDriveLetter] === folderPath) {
											this.worker.logger.warn(`Supressed error: ${errStr}`)

											this.worker.logger.warn(
												`Mapped drives: ${Object.keys(mappedDrives).join(',')}`
											)
											this.worker.logger.warn(
												`${freeDriveLetter} is currently mapped to ${mappedDrives[freeDriveLetter]}`
											)
										} else {
											this.worker.logger.warn(
												`Mapped drives: ${Object.keys(mappedDrives).join(',')}`
											)
											this.worker.logger.warn(
												`${freeDriveLetter} is currently mapped to ${mappedDrives[freeDriveLetter]}`
											)
											throw e
										}
									} else throw e
								}

								mappedDriveLetters[freeDriveLetter] = folderPath
								this.actualFolderPath = `${freeDriveLetter}:\\`
								handlingDone = true
							} else {
								// Not able to find any free drive letters.
								// Revert to direct access then
							}
						}
						return mappedDriveLetters
					}
				)
			}
		}

		if (!handlingDone) {
			// We're reverting to accessing through the direct path instead
			if (this.worker.type === WindowsWorker.type && this.accessor.userName) {
				// Try to add the credentials to the share in Windows:
				const setupCredentialsCommand = `net use "${folderPath}" /user:${this.accessor.userName} ${this.accessor.password}`
				try {
					await pExec(setupCredentialsCommand, {
						maxBuffer: MAX_EXEC_BUFFER,
					})
				} catch (err) {
					if (stringifyError(err, true).match(/multiple connections to a/i)) {
						// "Multiple connections to a server or shared resource by the same user, using more than one user name, are not allowed. Disconnect all previous connections to the server or shared resource and try again."

						// Remove the old and try again:
						await pExec(`net use "${folderPath}" /d`)
						await pExec(setupCredentialsCommand, { maxBuffer: MAX_EXEC_BUFFER })
					} else {
						throw err
					}
				}
			}
			this.actualFolderPath = folderPath
			handlingDone = true
		}
		if (!handlingDone) {
			// Last resort, just use the direct path:
			this.actualFolderPath = folderPath
			handlingDone = true
		}
	}
	private async getMountedDriveLetters(reason: string): Promise<{ [driveLetter: string]: string }> {
		let usedDriveLetters: { [driveLetter: string]: string } = {}

		try {
			// usedDriveLetters = (await networkDrive.list()) as { [driveLetter: string]: string }
			usedDriveLetters = await promiseTimeout(
				listNetworkDrives(),
				PREPARE_FILE_ACCESS_TIMEOUT_INNER,
				(timeoutDuration) =>
					`networkDrive.listNetworkDrives: Timeout after ${timeoutDuration}ms, reason: ${reason}`
			)
		} catch (err) {
			if (stringifyError(err, true).match(/No Instance\(s\) Available/)) {
				// this error comes when the list is empty
				usedDriveLetters = {}
			} else {
				throw err
			}
		}
		return usedDriveLetters
	}
	private async checkPackageContainerReadAccess(): Promise<AccessorHandlerResult> {
		await this.prepareFileAccess()
		try {
			await fsAccess(this.folderPath, fs.constants.R_OK)
			// The file exists
		} catch (err) {
			// File is not writeable
			return {
				success: false,
				reason: {
					user: `Not able to read from container folder`,
					tech: `Not able to read from container folder: ${stringifyError(err, true)}`,
				},
			}
		}
		return { success: true }
	}
}
interface MappedDriveLetters {
	[driveLetter: string]: string
}

async function listNetworkDrives(): Promise<{ [driveLetter: string]: string }> {
	const netUse = await pExec('net use')

	const drives: { [driveLetter: string]: string } = {}
	for (const d of parseNetUse(netUse.stdout)) {
		drives[d.local] = d.network
	}
	return drives
}
export function parseNetUse(
	str: string
): { status: string; statusOK: boolean; local: string; remote: string; network: string }[] {
	// "net use" returns:
	/*
	Nye tilkoblinger vil bli lagret.


	Status       Lokalt    Eksternt                  Nettverk

	-------------------------------------------------------------------------------
	Ikke tilgjen U:        \\my\very-very-very-very-very-very-very-long-path
													 Microsoft Windows Network
	Ikke tilgjen V:        \\my\path2                Microsoft Windows Network
	OK           Z:        \\my\path3                Microsoft Windows Network
	Kommandoen er fullført.
	*/

	const lines = `${str}`
		.replace(/^(-+)$/gm, '') // // remove "-----------------------------"-line
		.split('\n')
		.map((l) => l.replace(/[\r\n]/g, '')) // Trim line endings
		.filter(Boolean) // Remove empty lines
		.slice(1, -1) // Remove the first and last line, so that only the table remains

	// Fix an issue where the lines are split in multiple lines, because of a long path:
	let str3 = ''
	for (const line of lines) {
		if (line[0] === ' ') {
			// The line is a line-break of the previous line:
			str3 += ' ' + line.trim()
		} else {
			str3 += '\n' + line.trim()
		}
	}
	const data: {
		status: string
		statusOK: boolean
		local: string
		remote: string
		network: string
	}[] = []

	for (const line of str3.split('\n').slice(1)) {
		const m = line.match(/^(.+) +(\w): +([^ ]+) +(.+)$/)
		if (m) {
			const status = m[1].trim()
			data.push({
				status: status,
				statusOK: status === 'OK',
				local: m[2].trim(),
				remote: m[3].trim(),
				network: m[4].trim(),
			})
		}
	}
	return data
}

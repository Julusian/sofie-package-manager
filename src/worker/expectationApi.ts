import {
	ExpectedPackageStatusAPI,
	AccessorOnPackage,
	PackageContainerOnPackage,
} from '@sofie-automation/blueprints-integration'

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Expectation {
	export type Any = MediaFileCopy | MediaFileScan | QuantelClipCopy

	export enum Type {
		MEDIA_FILE_COPY = 'media_file_copy',
		MEDIA_FILE_SCAN = 'media_file_scan',

		QUANTEL_COPY = 'quantel_copy',
	}

	export interface Base {
		id: string
		type: Type

		/** Contains info for reporting back status to Core */
		statusReport: {
			/** Reference to the package-id from which this expectation originated from */
			packageId: string
		} & ExpectedPackageStatusAPI.WorkBaseInfo

		/** Contains info for determining that work can start (and is used to perform the work) */
		startRequirement: {
			sources: PackageContainerOnPackage[]
		}
		/** Contains info for determining that work can end (and is used to perform the work) */
		endRequirement: {
			targets: PackageContainerOnPackage[]
			content: any
			version: any
		}
		/** Reference to another expectation.
		 * Won't start until ALL other expectations are fullfilled
		 */
		dependsOnFullfilled?: string[]
		/** Reference to another expectation.
		 * On fullfillement, this will be triggered immediately.
		 */
		triggerByFullfilledIds?: string[]
	}

	export interface MediaFileCopy extends Base {
		type: Type.MEDIA_FILE_COPY

		startRequirement: {
			sources: PackageContainerOnPackageFile[]
		}
		endRequirement: {
			targets: PackageContainerOnPackageFile[]
			content: {
				filePath: string
			}
			version: MediaFileVersion
		}
	}
	export interface PackageContainerOnPackageFile extends PackageContainerOnPackage {
		accessors: {
			[accessorId: string]:
				| AccessorOnPackage.LocalFolder
				| AccessorOnPackage.FileShare
				| AccessorOnPackage.MappedDrive
				| AccessorOnPackage.HTTP
		}
	}
	export interface MediaFileVersion {
		fileSize?: number // in bytes
		modifiedDate?: number // timestamp (ms)?: number
		checksum?: string
		checkSumType?: 'sha' | 'md5' | 'whatever'
	}
	export interface MediaFileScan extends Base {
		type: Type.MEDIA_FILE_SCAN

		startRequirement: {
			sources: MediaFileCopy['endRequirement']['targets']
			content: MediaFileCopy['endRequirement']['content']
			version: MediaFileCopy['endRequirement']['version']
		}
		endRequirement: {
			targets: [PackageContainerOnPackageCorePackage]
			content: {
				filePath: string
			}
			version: MediaFileVersion
		}
	}
	export interface PackageContainerOnPackageCorePackage extends PackageContainerOnPackage {
		accessors: {
			[accessorId: string]: AccessorOnPackage.CorePackageCollection
		}
	}

	export interface QuantelClipCopy extends Base {
		type: Type.QUANTEL_COPY

		startRequirement: {
			sources: PackageContainerOnPackageQuantel[]
		}
		endRequirement: {
			targets: [PackageContainerOnPackageQuantel]
			content: {
				guid?: string
				title?: string
			}
			version: any // todo
		}
	}
	export interface PackageContainerOnPackageQuantel extends PackageContainerOnPackage {
		accessors: {
			[accessorId: string]: AccessorOnPackage.Quantel
		}
	}
}

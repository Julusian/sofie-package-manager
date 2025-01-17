import { IWorkInProgress } from '../../lib/workInProgress'
import {
	Expectation,
	ExpectationManagerWorkerAgent,
	LoggerInstance,
	PackageContainerExpectation,
	ReturnTypeDoYouSupportExpectation,
	ReturnTypeDoYouSupportPackageContainer,
	ReturnTypeGetCostFortExpectation,
	ReturnTypeIsExpectationFullfilled,
	ReturnTypeIsExpectationReadyToStartWorkingOn,
	ReturnTypeRemoveExpectation,
	ReturnTypeRunPackageContainerCronJob,
} from '@sofie-package-manager/api'

import { GenericWorker, GenericWorkerAgentAPI } from '../../worker'
import { SetupPackageContainerMonitorsResult } from '../../accessorHandlers/genericHandle'

/** This is a type of worker that runs on a linux machine */
export class LinuxWorker extends GenericWorker {
	static readonly type = 'linuxWorker'
	constructor(
		logger: LoggerInstance,
		agentAPI: GenericWorkerAgentAPI,
		sendMessageToManager: ExpectationManagerWorkerAgent.MessageFromWorker
	) {
		super(logger.category('LinuxWorker'), agentAPI, sendMessageToManager, LinuxWorker.type)
	}
	async doYouSupportExpectation(_exp: Expectation.Any): Promise<ReturnTypeDoYouSupportExpectation> {
		return {
			support: false,
			reason: { user: `Not implemented yet`, tech: `Not implemented yet` },
		}
	}
	async init(): Promise<void> {
		throw new Error(`Not implemented yet`)
	}
	terminate(): void {
		throw new Error(`Not implemented yet`)
	}
	async getCostFortExpectation(_exp: Expectation.Any): Promise<ReturnTypeGetCostFortExpectation> {
		throw new Error(`Not implemented yet`)
	}
	async isExpectationReadyToStartWorkingOn(
		_exp: Expectation.Any
	): Promise<ReturnTypeIsExpectationReadyToStartWorkingOn> {
		throw new Error(`Not implemented yet`)
	}
	async isExpectationFullfilled(
		_exp: Expectation.Any,
		_wasFullfilled: boolean
	): Promise<ReturnTypeIsExpectationFullfilled> {
		throw new Error(`Not implemented yet`)
	}
	async workOnExpectation(_exp: Expectation.Any): Promise<IWorkInProgress> {
		throw new Error(`Not implemented yet`)
	}
	async removeExpectation(_exp: Expectation.Any): Promise<ReturnTypeRemoveExpectation> {
		throw new Error(`Not implemented yet`)
	}

	async doYouSupportPackageContainer(
		_packageContainer: PackageContainerExpectation
	): Promise<ReturnTypeDoYouSupportPackageContainer> {
		return {
			support: false,
			reason: { user: `Not implemented yet`, tech: `Not implemented yet` },
		}
	}
	async runPackageContainerCronJob(
		_packageContainer: PackageContainerExpectation
	): Promise<ReturnTypeRunPackageContainerCronJob> {
		throw new Error(`Not implemented yet`)
	}
	async setupPackageContainerMonitors(
		_packageContainer: PackageContainerExpectation
	): Promise<SetupPackageContainerMonitorsResult> {
		throw new Error(`Not implemented yet`)
	}
}

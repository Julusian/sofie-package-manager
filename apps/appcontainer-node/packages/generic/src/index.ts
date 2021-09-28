import { getAppContainerConfig, ProcessHandler, setupLogging } from '@shared/api'
import { AppContainer } from './appContainer'

export { AppContainer } from './appContainer'

export async function startProcess(): Promise<void> {
	const config = getAppContainerConfig()

	const logger = setupLogging(config)

	logger.info('------------------------------------------------------------------')
	logger.info('Starting AppContainer')
	logger.info('------------------------------------------------------------------')

	const process = new ProcessHandler(logger)
	process.init(config.process)

	const appContainer = new AppContainer(logger, config)

	appContainer.init().catch(logger.error)
}
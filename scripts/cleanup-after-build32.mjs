/* eslint-disable node/no-unpublished-require, node/no-extraneous-require, no-console */

import path from 'path'
import fse from 'fs-extra'

const basePath = process.cwd()

console.log(`Cleaning up...`)

await fse.rm(path.resolve(path.join(basePath, 'tmp_packages_for_build')), {
	recursive: true,
})

console.log(`...done!`)

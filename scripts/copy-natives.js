/* eslint-disable node/no-unpublished-require, node/no-extraneous-require */

const find = require('find')
const os = require('os')
const path = require('path')
const fs = require('fs-extra')

const arch = os.arch()
const platform = os.platform()
const prebuildType = process.argv[2] || `${platform}-${arch}`

log('Copying native dependencies...')

const basePath = process.cwd()

const dirName = path.join(basePath, '../../..')
log(`Running in directory ${dirName} for patform "${prebuildType}"`)

// log(process.argv[2])

find.file(/\.node$/, path.join(dirName, 'node_modules'), (files) => {
	files.forEach((fullPath) => {
		if (fullPath.indexOf(dirName) === 0) {
			const file = fullPath.substr(dirName.length + 1)
			if (isFileForPlatform(file)) {
				log('Copy prebuild binary:', file)
				fs.copySync(file, path.join('deploy', file))
			}
		}
	})
})

function isFileForPlatform(filename) {
	if (filename.indexOf(path.join('prebuilds', prebuildType)) !== -1) {
		return true
	} else {
		return false
	}
}

function log(...args) {
	// eslint-disable-next-line no-console
	console.log(...args)
}

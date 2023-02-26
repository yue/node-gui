#!/usr/bin/env node

const path = require('path')
const downloadYue = require('download-yue')

// Version to download.
let version = 'v' + require('../package.json').version

// Ignore -x suffix.
const index = version.indexOf('-')
if (index > -1)
  version = version.substr(0, index)

// npm configs.
let platform = process.platform
if (process.env.npm_config_platform)
  platform = process.env.npm_config_platform
let targetCpu = process.env.npm_config_arch
if (!targetCpu)
  targetCpu = process.arch
if (targetCpu == 'ia32')
  targetCpu = 'x86'
const targetOs = {
  win32: 'win',
  linux: 'linux',
  darwin: 'mac',
}[platform]

main()

async function main() {
  const rootDir = path.resolve(__dirname, '..')
  try {
    await Promise.all([
      await downloadYue('yue', version,
                        `yue_typescript_declarations_${version}.zip`,
                        rootDir),
      await downloadYue('yue', version,
                        `napi_yue_${version}_${targetOs}_${targetCpu}.zip`,
                        rootDir),
    ])
  } catch (e) {
    console.error('Failed to download prebuilt binary:', e)
    process.exit(1)
  }
}

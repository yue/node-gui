#!/usr/bin/env node

const cp = require('child_process')
const os = require('os')
const path = require('path')
const util = require('util')

const downloadYue = require('download-yue')
const fs = require('../deps/fs-extra')
const glob = util.promisify(require('../deps/glob'))

// Version to download.
let version = 'v' + require('../package.json').version

// Ignore -x suffix.
const index = version.indexOf('-')
if (index > -1)
  version = version.substr(0, index)

// npm configs.
let runtime = process.env.npm_config_runtime
if (!runtime)
  runtime = 'node'
let nodever = process.env.npm_config_targetDir
if (!nodever)
  nodever = process.version
if (nodever.startsWith('v'))
  nodever = nodever.substr(1)
const shortver = nodever.substring(0, nodever.indexOf('.'))
let platform = process.platform
if (process.env.npm_config_platform)
  platform = process.env.npm_config_platform
let targetDirCpu = process.env.npm_config_arch
if (!targetDirCpu)
  targetDirCpu = process.arch
if (targetDirCpu == 'ia32')
  targetDirCpu = 'x86'
const targetDirOs = {
  win32: 'win',
  linux: 'linux',
  darwin: 'mac',
}[platform]

// Personal github token.
const token = process.env.GITHUB_TOKEN

const rootDir = path.resolve(__dirname, '..')
const targetDir = path.join(rootDir, 'deps', 'libyue')
main()

async function main() {
  await fs.emptyDir(targetDir)
  if (shouldBuildFromSource()) {
    await buildFromSourceCode()
    return
  }

  try {
    await Promise.all([
      downloadTypes(),
      downloadBinary(),
    ])
  } catch (e) {
    if (e.code != 404) {
      console.error('Failed to download prebuilt binary:', e)
      process.exit(1)
    }
    console.log('Prebuilt binary does not exist, build from source code')
    await buildFromSourceCode()
  }
}

async function downloadTypes() {
  const indexdts = `node_yue_types_${version}.zip`
  await downloadYue('yue', version, indexdts, targetDir, token),
  await fs.move(path.join(targetDir, 'index.d.ts'),
                path.join(rootDir, 'index.d.ts'),
                {overwrite: true})
}

async function downloadBinary() {
  const guinode = `node_yue_${runtime}_${shortver}_${version}_${targetDirOs}_${targetDirCpu}.zip`
  await downloadYue('yue', version, guinode, targetDir, token),
  await fs.move(path.join(targetDir, 'gui.node'),
                path.join(rootDir, 'gui.node'),
                {overwrite: true})
}

function shouldBuildFromSource() {
  return process.argv.includes('--build-from-source') ||
         process.env.npm_config_build_from_source != null
}

async function buildFromSourceCode() {
  try {
    await Promise.all([
      downloadTypes(),
      downloadLibyue(),
      downloadSource(),
    ])
  } catch (e) {
    console.error('Failed to download source code:', e)
    process.exit(2)
  }
  const options = {stdio: 'inherit', cwd: rootDir}
  cp.execSync('node-gyp configure', options)
  cp.execSync(`node-gyp build --jobs=${os.cpus().length}`, options)
}

async function downloadLibyue() {
  const libyue = `libyue_${version}_${targetDirOs}.zip`
  await downloadYue('yue', version, libyue, targetDir, token)
  const files = await glob('deps/libyue/src/**/*', {cwd: rootDir, nodir: true})
  await fs.writeJson(path.join(rootDir, 'filenames_libyue.gypi'),
                     {variables: {libyue_sources: files}},
                     {spaces: 2})
}

async function downloadSource() {
  const srcDir = path.join(rootDir, 'src')
  await Promise.all([
    downloadYue('yue', version, 'Source code (zip)', targetDir, token),
    fs.emptyDir(srcDir),
  ])
  const source = path.join(targetDir, 'yue-' + version.substr(1))
  await Promise.all([
    fs.move(path.join(source, 'node_yue'), path.join(srcDir, 'node_yue')),
    fs.move(path.join(source, 'v8binding'), path.join(srcDir, 'v8binding')),
  ])
  await Promise.all([
    fs.remove(source),
    (async () => {
      const files = await glob('src/**/*', {cwd: rootDir, nodir: true})
      await fs.writeJson(path.join(rootDir, 'filenames_src.gypi'),
                         {variables: {node_yue_sources: files}},
                         {spaces: 2})
    })(),
  ])
}

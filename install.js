#!/usr/bin/env node

// Copyright 2017 Cheng Zhao. All rights reserved.
// Use of this source code is governed by the license that can be found in the
// LICENSE file.

const downloadYue = require('download-yue')

// Version to download.
const version = 'v' + require('./package.json').version

// Parse runtimes and versions.
let runtime = process.env.npm_config_runtime
if (!runtime)
  runtime = 'node'
let nodever = process.env.npm_config_target
if (!nodever)
  nodever = process.version
if (nodever.startsWith('v'))
  nodever = nodever.substr(1)
let platform = process.platform
if (process.env.npm_config_platform)
  platform = process.env.npm_config_platform
let targetCpu = process.env.npm_config_arch
if (!targetCpu)
  targetCpu = process.arch
if (targetCpu == 'ia32')
  targetCpu = 'x86'
let shortver = nodever.substring(0, nodever.lastIndexOf('.'))
if (runtime == 'node')
  shortver = shortver.substring(0, shortver.lastIndexOf('.'))

// Get the filename of binary.
const targetOs = {
  win32: 'win',
  linux: 'linux',
  darwin: 'mac',
}[platform]
const filename = `node_yue_${runtime}_${shortver}_${version}_${targetOs}_${targetCpu}.zip`

// Personal github token.
const token = process.env.GITHUB_TOKEN

downloadYue('yue', version, filename, __dirname, token).catch((e) => {
  console.error('Failed to install Yue:', e.message)
  process.exit(1)
})

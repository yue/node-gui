function isBrokenVersion(v) {
  if (v[0] != 12)
    return false
  if (v[1] == 13 && v[2] >= 1)
    return true
  if (v[1] == 16 && v[2] <= 1)
    return true
  if (v[1] > 13 && v[1] < 16)
    return true
  return false
}

if (!process.versions.electron && !process.versions.yode && !process.env.YODE_DISABLE_NODE_WARNING) {
  console.warn("Using node-gui in upstream Node.js is experimental.")

  if (process.platform === 'darwin') {
    const v = process.version.substr(1).split('.').map(n => Number(n))
    if (isBrokenVersion(v))
      console.error(`Node.js ${process.version} has a bug preventing GUI to show on macOS, please use versions <= v12.13.0 or >= v12.16.2.`)
  }
}

const fs = require('fs')
const path = require('path')

const downloadModule = path.resolve(__dirname, '..', 'gui.node')
const builtModule = path.resolve(__dirname, '..', 'build', 'Release', 'gui.node')

module.exports = fs.existsSync(downloadModule) ? require(downloadModule)
                                               : require(builtModule)

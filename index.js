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

if (!process.versions.electron && !process.versions.yode) {
  console.warn("Using this module in Node.js is experimental.")

  if (process.platform === 'darwin') {
    const v = process.version.substr(1).split('.').map(n => Number(n))
    if (isBrokenVersion(v))
      console.error(`Node.js ${process.version} has a bug preventing GUI to show on macOS, please use versions <= v12.13.0 or >= v12.16.2.`)
  }
}

module.exports = require('./gui.node')

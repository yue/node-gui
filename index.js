if (!process.versions.electron || !process.versions.yode)
  console.warn("Using this module under Node.js is unstable.")

module.exports = require('./gui.node')

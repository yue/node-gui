if (!process.versions.electron && !process.versions.yode)
  console.warn("Using this module in Node.js is experimental.")

module.exports = require('./gui.node')

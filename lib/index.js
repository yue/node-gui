if (!process.versions.electron && !process.versions.yode && !process.env.YODE_DISABLE_NODE_WARNING) {
  console.warn("Using node-gui in upstream Node.js is experimental.")
}

const path = require('path')

module.exports = require(path.resolve(__dirname, '..', 'gui.node'))

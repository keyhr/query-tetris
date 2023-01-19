/** @type {import('webpack').Configuration} */

const path = require("path")
const config = require("./webpack.config")

config.entry = "./src/devmain.tsx"
config.devServer = {
  "contentBase": path.join(__dirname, "dist")
}

module.exports = config

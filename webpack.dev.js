/** @type {import('webpack').Configuration} */

const path = require("path");
const config = require("./webpack.config");

config.mode = "development";
config.entry = "./src/devmain.tsx";
config.devServer = {
  "static": {
    "directory": path.join(__dirname, "dist"),
  },
  "port": 3000,
};
config.ignoreWarnings = [/./];
config.devtool = "cheap-module-source-map";

module.exports = config;

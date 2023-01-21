/** @type {import('webpack').Configuration} */

const path = require("path");
const config = require("./webpack.config");

config.entry = "./src/devmain.tsx";
config.devServer = {
  "static": {
    "directory": path.join(__dirname, "dist"),
  },
  "port": 3000,
};

module.exports = config;

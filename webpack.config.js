/** @type {import('webpack').Configuration} */
module.exports = {
  "mode": "development",
  "entry": "./src/main.tsx",
  "output": {
    "path": `${__dirname}/dist`,
    "filename": "bundle.js"
  },
  "module": {
    "rules": [
      {
        test: /\.tsx?$/,
        use: "ts-loader"
      }
    ]
  },
  "resolve": {
    "extensions": [".ts", ".tsx", ".js", ".json"]
  },
  "target": ["web", "es5"]
}
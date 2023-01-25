/** @type {import('webpack').Configuration} */
module.exports = {
  "mode": "production",
  "entry": "./src/main.tsx",
  "output": {
    "path": `${__dirname}/dist`,
    "filename": "bundle.js",
  },
  "module": {
    "rules": [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
      },
      {
        test: /\.scss$/,
        use: [ "style-loader", "css-loader", "sass-loader" ],
      },
    ],
  },
  "plugins": [
  ],
  "resolve": {
    "extensions": [".ts", ".tsx", ".js", ".json"],
  },
  "target": ["web", "es5"],
};

const { merge } = require("webpack-merge");
const paths = require("./paths");
const common = require("./webpack.common.js");
/**
 * @type {import('webpack').Configuration}
 */
module.exports = merge(common, {
  mode: "production",
  devtool: false,
  output: {
    path: paths.build,
    publicPath: paths.base,
    filename: "runtime/js/[name].[contenthash].bundle.js",
  },
});

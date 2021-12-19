const { merge } = require("webpack-merge");
const paths = require("./paths");
const common = require("./webpack.common.js");
module.exports = merge(common, {
  mode: "production",
  devtool: false,
  output: {
    path: paths.build,
    publicPath: "/",
    filename: "js/[name].[contenthash].bundle.js",
  },
});

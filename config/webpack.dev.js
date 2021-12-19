const { merge } = require("webpack-merge");
const paths = require("./paths");
const common = require("./webpack.common.js");
module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    historyApiFallback: true,
    compress: true,
    hot: true,
    port: 3000,
    open: false,
  },
});

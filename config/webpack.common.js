const paths = require("./paths");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlPlugin = new HtmlWebPackPlugin({
  title: "Project Title",
  template: paths.public + "/index.html", // template file
  filename: "index.html", // output file
});
/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  entry: [paths.src + "/index.js"],
  output: {
    path: paths.build,
    filename: "[name].bundle.js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.(t|j|cj|mj)sx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(s[a|c]ss)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [new CleanWebpackPlugin(), htmlPlugin],
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  }
};

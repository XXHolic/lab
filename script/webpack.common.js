const path = require("path");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const basePath = path.dirname(__dirname);

module.exports = {
  entry: path.resolve(basePath, "src/index.js"),
  plugins: [
    // new CleanWebpackPlugin(),
    // new HtmlWebpackPlugin({
    //   template: path.resolve(basePath, "public/index.html")
    // }),
  ],
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all"
        }
      }
    }
  },
  module: {
    rules: [
      // {
      //   test: /\.tsx?$/,
      //   use: 'ts-loader',
      //   exclude: /node_modules/,
      // }
    ]
  },
  resolve:{
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  output: {
    filename: "[name].[hash].js",
    path: path.resolve(basePath, "dist")
  }
};

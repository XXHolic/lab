const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  devServer: {
    port:2234,
    contentBase: "../dist",
    hot: true,
  },
  stats: "errors-only",
  devtool: 'eval-source-map',
  module: {
    // rules: [

    // ]
  },
  plugins: [

  ]
});
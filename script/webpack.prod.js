const path = require("path");
const basePath = path.dirname(__dirname);
const filterArgv = require('./filterArgv.js')
const outPath = filterArgv('--outPath') || 'dist';
const filename = filterArgv('--filename') || 'index';

module.exports =  {
  entry: path.resolve(basePath, "packages/browser/src/index.ts"),
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ]
  },
  resolve:{
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  optimization:{
    minimize: false,
  },
  plugins:[],
  output: {
    filename: `${filename}.js`,
    path: path.resolve(basePath, outPath),
    libraryTarget: 'umd',
    library: 'Argos',
  },

};
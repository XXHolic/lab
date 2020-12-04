const path = require("path");
const basePath = path.dirname(__dirname);
const filterArgv = require('./filterArgv.js')
const outPath = filterArgv('--outPath') || 'dist';
const filename = filterArgv('--filename') || 'index';

module.exports =  {
  entry: path.resolve(basePath, "blog/70/entry.js"),
  mode: 'production',
  devtool: 'source-map',
  output: {
    filename: `${filename}.js`,
    path: path.resolve(basePath, outPath),
  },

};
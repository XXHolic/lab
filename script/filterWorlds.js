#! /usr/bin/env node
/**
 * 提取文字
 */

var fs = require("fs");

fs.readFile("../segment/79/index.html",'utf8', (err, data) => {
  if (err) throw err;
  console.log(typeof data);
  const reg =
});
#! /usr/bin/env node
/**
 * 提取文字
 */

var fs = require("fs");

fs.readFile("../segment/79/index.html",'utf8', (err, data) => {
  if (err) throw err;
  console.log(typeof data);
  const arr = data.match(/<td>.<\/td>/g);
  const worlds = arr.map((ele) => {
    return ele.slice(4,5)
  })
  const jsonStr = JSON.stringify({ data: worlds, total: worlds.length });
  fs.writeFile("../segment/79/data.json", jsonStr, function (err) {
    if (err) {
      console.error("文件写入失败");
    } else {
      console.info("文件写入成功，路径为：", "../segment/79/data.json");
    }
  });
});
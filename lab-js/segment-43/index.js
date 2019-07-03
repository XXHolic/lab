var fs = require("fs");
var path = require("path");

function readDir(dir) {
  var exist = fs.existsSync(dir);
  if (!exist) {
    console.error("目录路径不存在");
    return;
  }
  var pa = fs.readdirSync(dir);

  for (let index = 0; index < pa.length; index++) {
    let file = pa[index];
    var pathName = path.join(dir, file);
    var info = fs.statSync(pathName);
    if (info.isDirectory()) {
      console.info("dir:" + file);
      readDir(pathName);
    } else {
      if (path.extname(file) === '.json') {
        console.info('get it');

      }
      console.info("file:" + file);
    }
  }


}

readDir("/Users/thy/repository/my/lab/css");

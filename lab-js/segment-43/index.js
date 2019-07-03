var fs = require("fs");
var path = require("path");

function readDir(dir) {
  var pa = fs.readdirSync(dir);
  pa.forEach(function(file,index) {
    console.warn(index)
    var pathName = path.join(dir,file);
    var info = fs.statSync(pathName);
    if(info.isDirectory()) {
      console.info("dir:" + file);
      readDir(pathName);
    } else {
      console.info("file:" + file);
    }
  })
}

readDir("/Users/thy/repository/my/lab/css/");
var fs = require("fs");
var path = require("path");
var currentPath = process.cwd();// 获取当前执行路径

console.info("process.cwd()", process.cwd());

var fileArr=[];

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
      // console.info("dir:" + file);
      readDir(pathName);
    } else {
      if (path.extname(file) === '.json') {
        // console.info('get it');
        fileArr.push(pathName);
      }
      // console.info("file:" + file);
    }
  }


}

/**
 *
 * @param {Array} arr 包含了所有 JSON 文件的路径
 * @returns {String} 返回合并后 JSON 字符串
 */
function combineFile(arr) {
  var obj = {};
  arr.length && arr.forEach(ele => {
    // console.info("deleDom:", element);
    var str = deleDom(ele);
    var contentObj = JSON.parse(str);
    Object.assign(obj,contentObj);
  });
  return JSON.stringify(obj);
}

// 删除 dom 符号，防止异常
function deleDom(filePath) {
  var bin = fs.readFileSync(filePath);
  if (bin[0]=== 0xEF && bin[1] === 0xBB && bin[2]=== 0xBF) {
    bin = bin.slice(3);
  }

  return bin.toString('utf-8');
}

readDir(currentPath);

var jsonStr = combineFile(fileArr);

fs.writeFile('./data.json',jsonStr,function(err) {
  if (err) {
    console.error('文件写入失败');
  } else {
    console.info("文件写入成功，路径为：", currentPath);
  }
});



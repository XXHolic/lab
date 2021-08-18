const fs = require("fs");
const filePath = "../blog/90/data.txt";
const str = fs.readFileSync(filePath, { encoding: "utf-8" });
const strSplit = str.split(/[\r\n]/g);
// console.log("-----");
// console.log(strSplit);
let result = [];
const dataFormat = strSplit.map((ele, index) => {
  const eleSplit = ele.split(",");
  if (index === 0) {
    result.columns = eleSplit;
  } else {
    const [date, close, lower, middle, upper] = eleSplit;
    result.push({
      date: date,
      close: Number(close),
      lower: Number(lower),
      middle: Number(middle),
      upper: Number(upper),
    });
  }
  return ele;
});

const writePath = "../blog/90/data.json";
const jsonStr = JSON.stringify(result);
fs.writeFile(writePath, jsonStr, function (err) {
  if (err) {
    console.error("文件写入失败");
  } else {
    console.info("文件写入成功");
  }
});

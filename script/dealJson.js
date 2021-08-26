const fs = require("fs");
const filePath = "../blog/92/data.txt";
const str = fs.readFileSync(filePath, { encoding: "utf-8" });
const strSplit = str.split(/[\r\n]/g);
// console.log("-----");
// console.log(strSplit);
const formatNum = (num) => {
  const numStr = String(num);
  const numArr = numStr.split(".");
  if (numArr.length > 1) {
    const dotNum = numArr[1];
    const newDotNum = dotNum.substring(0, 11);
    return Number(`${numArr[0]}.${newDotNum}`);
  }
  return Number(numStr);
};
let result = [];
let columns = [];
let nameData = [];
const dataFormat = strSplit.map((ele, index) => {
  const eleSplit = ele.split(",");
  if (index === 0) {
    columns = eleSplit;
  } else {
    // const [date, close, lower, middle, upper] = eleSplit;
    // result.push({
    //   date: date,
    //   close: Number(close),
    //   lower: Number(lower),
    //   middle: Number(middle),
    //   upper: Number(upper),
    // });

    const nameField = eleSplit.shift();
    nameData.push(nameField);
    const total = eleSplit.reduce((total, cur, index) => {
      total = total + Number(cur);
      return total;
    }, 0);
    eleSplit.map((ele, index) => {
      const divResult = Number(ele) / total;
      result.push({
        name: nameField,
        age: columns[index + 1],
        value: formatNum(divResult),
      });
    });
  }
  return ele;
});

const writePath = "../blog/92/data.json";
columns.shift();
const jsonStr = JSON.stringify({
  list: result,
  ages: columns,
  names: nameData,
});
fs.writeFile(writePath, jsonStr, function (err) {
  if (err) {
    console.error("文件写入失败");
  } else {
    console.info("文件写入成功");
  }
});

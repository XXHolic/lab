window.onload = function() {
  function fun(num) {
    let numMap = {0:"零",1:"一",2:"二",3:"三",4:"四",5:"五",6:"六",7:"七",8:"八",9:"九"};
    let unitMap = ["十","百","千","万"];
    let numArr = String(num).split('');
    let numArrLen = numArr.length;
    unitMap.length = numArrLen - 1;
    unitMap.reverse();

    let format = numArr.map((ele,index)=>{
      let word = numMap[ele];
      let unit = unitMap[index]?unitMap[index]:'';
      if (ele === '0') {
        return `${word}`
      } else {
        return `${word}${unit}`
      }

    });

    return format.join('');
  }

  let format = fun(23307);
  console.info(format);
};

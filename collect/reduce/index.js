window.onload = function() {

  //问题：1 到 10000 之间的数字中，总共有多个 0

var arr = Array.from({length: 10000},(value,index)=>{return String(index+1)});
// var arr = ['1','2','3'];

var result = arr.reduce((preValue,currentValue,currentIndex)=>{
  // console.info(currentValue);
  var len = currentValue.length;
  var count = 0;

  for (let index = 0; index < len; index++) {
    const element = currentValue[index];
    if (element==='0') {
      count++
    }
  }

  return (preValue + count);
},0)

// console.info("arr", arr);
console.info("result", result);

};

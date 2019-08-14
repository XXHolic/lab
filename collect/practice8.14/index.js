window.onload = function() {
  // 1.
  var obj = {
    a: 1,
    b: () => {
      console.log(this);
    },
    c: function() {
      console.log(this);
    }
  };
  obj.b(); // window
  obj.b.call(obj); // 箭头函数是在定义的时候就决定了 绑定的 this。
  obj.b.call(window); // window
  obj.c(); // obj
  obj.c.call(window); // window

  // 2
  // 实现钱千位打分号，比如：1234567.222 => 1,234,567.22
  var setSemicolon = (num, pos = 3) => {
    var numStr = String(num);
    var numSplit = numStr.split(".");
    let beforeSemicolon = numSplit[0];
    let beforeSemicolonLen = beforeSemicolon.length;
    var beforeSemicolonNum = Math.floor(beforeSemicolonLen / pos);
    var mod = beforeSemicolonLen % pos;
    // var afterSemicolonNum = Math.floor(numSplit[1]/pos);

    var interPart = [];
    for (let index = 1; index <= beforeSemicolonNum; index++) {
      let getPos = beforeSemicolonLen - pos * index;
      let str = beforeSemicolon.substr(getPos, pos);
      interPart.unshift(str);
    }

    if (mod) {
      interPart.unshift(beforeSemicolon.substr(0, mod));
    }

    var formatStr = interPart.join(",");

    return `${formatStr}.${numSplit[1]}`;
  };

  var res = setSemicolon(1234567.222);
  console.info(res);

  // 3实现case
  // 实现case函数，大小写转化
  // abcd-efg => Abcd-Efg
  // Abcd-Efg => abcd-efg
  function tran(str) {
    var arr = [];
    var strArr = str.split("-");
    var frontStr = strArr[0];
    var afterStr = strArr[1];
    var frontStrFirst = frontStr.slice(0, 1);
    var afterStrFirst = afterStr.slice(0, 1);
    var frontStrFirstToLower = frontStrFirst.toLowerCase();
    var frontStrFirstToUpper = frontStrFirst.toUpperCase();
    let leftStr = frontStr.slice(1);
    if (frontStrFirst === frontStrFirstToLower) {
      arr.push(`${frontStrFirstToUpper}${leftStr}`);
    } else {
      arr.push(`${frontStrFirstToLower}${leftStr}`);
    }
    arr.push("-");
    var afterStrFirst = afterStr.slice(0, 1);
    var afterStrFirstToLower = afterStrFirst.toLowerCase();
    var afterStrFirstToUpper = afterStrFirst.toUpperCase();
    let afterLeftStr = afterStr.slice(1);
    if (afterStrFirst === afterStrFirstToLower) {
      arr.push(`${afterStrFirstToUpper}${afterLeftStr}`);
    } else {
      arr.push(`${afterStrFirstToLower}${afterLeftStr}`);
    }
    return arr.join("");
  }
  // var a = tran("abcd-efg");
  var a = tran("Abcd-Efg");
  console.info(a);

  // 4. toast和dialog组件写一个

};

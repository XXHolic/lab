window.onload = function() {
  var getLongList = () => {
    var a = [];
    for (let index = 0; index < 10000; index++) {
      a.push(index + 1);
    }
    return a;
  };
  var list = getLongList();
  var loop = function(list) {
    var item = list.pop();
    if (item) {
      loop(list);
    } else {
      console.info('done');
    }
  };

  // loop(list);

  // 去重算法
  var a = [1,2,3,4,5,5,4,3,6,2];
  var b =[];
  for (let index = 0; index < a.length; index++) {
    const element = a[index];
    if (b.indexOf(element)=== -1) {
      b.push(element);
    }
  }

  // console.info(b);

  var a1 = [1, 2, 3, 4, 5, 5,5, 4, 3, 6, 2];
  for (let index = 0; index < a1.length; index++) {
    const element = a[index];
    let indexFront = a1.indexOf(element);
    let indexBehind = a1.lastIndexOf(element);
    while (indexFront !== indexBehind) {
      a1.splice(indexBehind,1);
      indexBehind = a1.lastIndexOf(element);
    }
  }


  // console.info(a1);


};

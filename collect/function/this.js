var counter = {
  count:1,
  getCount:function() {
    console.info('count:',this.count);
    // console.info('count:',counter.count);

    // return (function(para) {
    //   console.info("count:", para);
    // })(counter.count);
  },
  getCount2:() => {
    // 对象构成不了作用域，所以这时 this 指向的 window
    console.info("count2:", this.count);
  }
}

counter.getCount();
var getCount = counter.getCount;
var getCount2 = counter.getCount2;
getCount();
getCount2();
window.onload = function() {
  let filterArr = [1, 2, 3, 4, 5];
  let result = filterArr.filter(function(ele) {
    return ele > 3;
  });
  console.info(result); // [4,5]

  let findArr = [1, 2, 3, 4, 5];
  let findResult = findArr.find(function(ele) {
    return ele > 3;
  });
  console.info(findResult); // 4
  let findIndexResult = findArr.findIndex(function(ele) {
    return ele > 3;
  });
  console.info(findIndexResult); // 3

  let indexArr = [1, 2, 3, 3, 4, 5];
  let indexOfResult = indexArr.indexOf(3);
  console.info(indexOfResult); // 2
  let lastIndexOfResult = indexArr.lastIndexOf(3);
  console.info(lastIndexOfResult); // 3

  let sliceArr = [1, 2, 3, 4];
  let sliceResult = sliceArr.slice(1, 3);
  console.info(sliceResult); // [2,3]

  let judgeArr = [1, 2, 3, 4, 5];
  let everyResult = judgeArr.every(function(ele, index, arr) {
    // console.info("ele:", ele);
    // if (index === 0) {
    //   arr.pop();
    // }
    return ele > 0;
  });
  console.info(everyResult); // true

  let includesResult = judgeArr.includes(3);
  console.info(includesResult); //true

  let someResult = judgeArr.some(function(ele, index, arr) {
    // console.info("ele:", ele);
    // if (index === 0) {
    //   arr.pop();
    // }
    return ele > 4;
  });
  console.info(someResult); // true

  let loopArr = [1, 2, 3, 4, 5];

  function Counter() {
    this.sum = 0;
    this.count = 0;
  }

  Counter.prototype.add = function(array) {
    array.forEach(function(entry) {
      this.sum += entry;
      ++this.count;
    }, this);
  };

  var obj = new Counter();
  obj.add(loopArr);
  console.info(obj.sum); // 15

  let mapResult = loopArr.map(parseInt);
  console.info(mapResult); // [1, NaN, NaN, NaN, NaN]

  let reduceArr = [1, 2, 3, 4, 5];
  let reduceResult = reduceArr.reduce(function(accumulator, currentValue) {
    return accumulator + currentValue;
  });
  console.info(reduceResult); // 15

  let arr = [1, 2, 3, 4];
  arr.pop();
  console.info(arr); // [1, 2, 3]

  arr.shift();
  console.info(arr); // [2, 3]

  arr.push("push");
  console.info(arr); // [2, 3, "push"]

  arr.unshift("unshift");
  console.info(arr); // ["unshift", 2, 3, "push"]

  let transferArr = [1, 2, 3, 4, 5];
  let joinResult = transferArr.join("-");
  console.info(joinResult); // 1-2-3-4-5

  transferArr.reverse();
  console.info(transferArr); // [5, 4, 3, 2, 1]

  let spliceArr = [1, 2, 3, 4, 5];
  spliceArr.splice(1, 0, "add");
  console.info(spliceArr);

  spliceArr.splice(1, 1);
  console.info(spliceArr);

  spliceArr.splice(1, 1, "replace");
  console.info(spliceArr);

  spliceArr.splice(1, 2, "add less");
  console.info(spliceArr);

  spliceArr.splice(1, 1, "add more", "add more");
  console.info(spliceArr);

  let getArr = [{ name: "Tom" }, { age: 19 }, { height: 170 }];
  for (const iterator of getArr.entries()) {
    console.info(iterator);
    // [0,{name:"Tom"}]
    // [1,{age:19}]
    // [2,{height:170}]
  }
  for (const iterator of getArr.keys()) {
    console.info(iterator);
    // 0
    // 1
    // 2
  }
  for (const iterator of getArr.values()) {
    console.info(iterator);
    // {name:"Tom"}
    // {age:19}
    // {height:170}
  }

  console.info(Array.from("name")); //  ["n", "a", "m", "e"]
  console.info(Array.from({ name: "Tom", age: "19", length: 3 })); //  [undefined, undefined, undefined]
  console.info(Array.from({ 0: "Tom", 1: "19", length: 3 })); //  ["Tom", "19", undefined]
  console.info(Array.from({ length: 3 })); // [undefined, undefined, undefined]

  console.info(Array.of(3)); // [3]
  console.info(Array(3)); // [,,]

  console.info(Array.of(1, 2, 3)); // [1, 2, 3]
  console.info(Array.of(undefined)); // [undefined]

  console.info(Array.isArray()); // false
  console.info(Array.isArray([1])); // true
  console.info(Array.isArray(new Array())); // true
  // 鲜为人知的事实：其实 Array.prototype 也是一个数组。
  console.info(Array.isArray(Array.prototype)); // true

  class LazyManClass {
    constructor(name) {
      this.name = name;
      this.task = [];
      console.info( `Hi I am ${name}`);
      let _self = this;
      setTimeout(function() {
        _self.next();
      },0);
    }

    next() {
      let fun = this.task.shift();
      fun && fun();
    }

    eat(para) {
      this.task.push(this._eat.bind(this,para));
      return this;
    }
    _eat(para) {
      console.info(`I am eat ${para}`);
      this.next();
    }

    sleep(time) {
      console.info(`等待 ${time} 秒`);
      this.task.push(this._sleep.bind(this,time));
      return this;
    }

    _sleep(para) {

      // let _self = this;
      setTimeout(()=>{
        this.next();
      },para*1000);
    }
  }

  function LazyMan(name) {
    return new LazyManClass(name);
  }

  LazyMan('Tony');

LazyMan('Tony').sleep(10).eat('lunch');
};

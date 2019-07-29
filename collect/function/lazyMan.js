function LazyPeople(name) {
  this.task = [];

  this.next = function() {
    var task = this.task.shift();
    task && task();
  };

  this.eat = function(para) {
    var _self = this;
    var fun = function(para) {
      console.info(`Eat ${para} ~`);
       _self.next();
    };
    this.task.push(fun.bind(this, para));
    return this;
  };

  this.sleep = function(para) {
    var fun = function(para) {
      var _self = this;
      setTimeout(function() {
        console.info(`Wake Up after ${para} ~`);
        _self.next();
      }, para * 1000);
    };
    this.task.push(fun.bind(this, para));
    this.next();
    return this;
  };

  this.sleepFirst = function(para) {
    var fun = function(para) {
      var _self = this;
      setTimeout(function() {
        console.info(`sleepFirst Wake Up after ${para} ~`);
        _self.next();
      }, para * 1000);
    };
    this.task.unshift(fun.bind(this, para));
    this.next();
    return this;
  }

  this.hello = function(para) {
    console.info(`hello ${para}`);
    this.next();
    return this;
  }

  name && this.task.push(this.hello.bind(this, name));
  var _self =this;
  name && setTimeout(function(){
    _self.next();
  },0)
}

function lazyMan(name) {
  return new LazyPeople(name);
}
// lazyMan('Tom').sleepFirst(2);
lazyMan("Sam").eat('dinner').eat('beef');
// lazyMan("Tom").sleepFirst(2);
// lazyMan("Tom").sleep(2).eat('lunch').eat('apple');;
// console.info(lazyManObj);
// var step1 = lazyManObj.sleep(1).eat("dinner");
// console.info(step1);

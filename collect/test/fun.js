window.onload = function() {
  function sum (...params) {
    const result = params.reduce((acc,pre) => {
      return acc + pre;
    },0);
    const fun = function(argus) {
      return sum(...params,...argus)
    }
    fun.sumOf = () => {
      return result;
    }

    return fun;

  }

  class Man {
    constructor(name) {
      this.progress = [];
      setTimeout(() => {
        // console.log(`Hi,This is ${name}!`)
        this.nextTick();
      },0)
      this.showName(name);

    }

    showName(name) {
      const show = () => {
        console.log(`Hi,This is ${name}!`)
        this.nextTick();
      }
      this.progress.push(show);
      return this;
    }

    sleepFirst(times) {
      const sleepFun = () => {
        setTimeout(() => {
          console.log(`sleep First ${times} seconds~`);
          this.nextTick();
        },times*1000)
      }
      this.progress.unshift(sleepFun);
      return this;
    }

    nextTick() {
      const fun = this.progress.shift();
      fun && fun();
    }

    eat(data) {
      const eatFun = () => {
        console.log(`Eat ${data}~`)
        this.nextTick();
      }
      this.progress.push(eatFun);
      return this;
    }

    sleep(times) {
      const sleepFun = () => {
        setTimeout(() => {
          console.log(`sleep ${times} seconds~`);
          this.nextTick();
        },times*1000)
      }
      this.progress.push(sleepFun);
      return this;
    }
  }

  function lazyMan(name) {
    return new Man(name);
  }

  // lazyMan('Hank')
  // lazyMan('Hank').eat('dinner')
  // lazyMan('Hank').sleep(3).eat('dinner')
  // lazyMan('Hank').sleepFirst(3).eat('dinner')

  function getHtml() {
    const ele = document.querySelectorAll("#test li");
    ele.forEach((element,index) => {
      element.index = index;
      element.onclick = function() {
        console.log(this.index)
      }
    })

  }

  getHtml();

};

window.onload = function() {
  class Man {
    constructor(name) {
      this.task=[];
      this.showName(name);
      setTimeout(()=>{
        this.next();
      })

    }

    next() {
      const fun = this.task.shift();
      fun && fun();
    }

    sleepFirst(time) {
      const _sleepFirst = () => {
        setTimeout(()=>{
          console.log(`Wake up after ${time} second`);
          this.next();
        },time*1000);
      }

      this.task.unshift(_sleepFirst);
      return this;
    }

    showName(name) {
      const _showName = () => {
        console.log(`Hi! This is ${name} !`)
        this.next();
      };
      this.task.push(_showName);
      return this;
    }

    sleep(time) {
      const _sleep = () => {
        setTimeout(()=>{
          console.log(`Wake up after ${time} second`);
          this.next();
        },time*1000);
      };
      this.task.push(_sleep);
      return this;
    }

    eat(args) {
      const _eat = () => {
        console.log(`Eat ${args} !`);
        this.next();
      }
      this.task.push(_eat);
      return this;
    }

  }

  function LazyMan(name) {
    return new Man(name);
  }

  // LazyMan('Tom');
  // console.info('fdsaf',LazyMan('Tom'));
  // LazyMan("Hank").sleep(3).eat("dinner")
  LazyMan("Hank").sleepFirst(5).eat("supper")
}
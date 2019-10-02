class LazyManMain {
  constructor(name) {
    this.name = name;
    this.tasks = [];
    this.say();
    const _self = this;
    setTimeout(function() {
      _self.run();
    }, 0);
  }
  run() {
    const tasksPromise = this.tasks.map(task => async () => this.toPromise(task.fn, task.duration));
    this.mergePromise(tasksPromise);
  }
  mergePromise(ajaxArray) {
    async function run() {
      for (let p of ajaxArray) {
        await p();
      }
    }
    return run();
  }
  mergePromise2(promiseTask) {
    let p = Promise.resolve();
    promiseTask.forEach(promise => {
      p = p.then(promise).then(d => {});
    });
  }
  toPromise(fn, duration) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          fn();
          resolve();
        } catch (err) {
          reject(err);
        }
      }, duration);
    });
  }
  say() {
    const say = () => {
      console.log(`Hi! this is ${this.name}!`);
    };
    this.tasks.push({ fn: say });
    return this;
  }
  sleepFirst(duration) {
    const sleepFirst = function() {
      console.log(`Wake up after ${duration}`);
    };
    this.tasks.unshift({ fn: sleepFirst, duration });
    return this;
  }
  sleep(duration) {
    const sleep = function() {
      console.log(`Wake up after ${duration}`);
    };
    this.tasks.push({ fn: sleep, duration });
    return this;
  }
  eat(food) {
    const eat = function() {
      console.log(`Eat ${food}`);
    };
    this.tasks.push({ fn: eat });
    return this;
  }
}
function LazyMan(name) {
  return new LazyManMain(name);
}
// LazyMan('Hank')
  // .sleep(1000)
  // .eat('dinner');

  // LazyMan('Hank2').eat('dinner').eat('supper');

  LazyMan('Hank').sleepFirst(5).eat('supper')

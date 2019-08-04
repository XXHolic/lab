window.onload = function() {
  class Fruit {
    constructor(name) {
      this.name = name;
    }

    showName() {
      console.info("Fruit Name:", this.name);
    }
  }

  class Apple extends Fruit {
    constructor(name, color) {
      super(name);
      this.color = color;
    }

    showColor() {
      console.info("Apple Color:", this.color);
    }
  }

  let apple = new Apple("apple", "green");
  console.info("apple:", apple);
  apple.showName();
  apple.showColor();

  // 继承
  function Ball(name) {
    this.name = name;
  }

  Ball.prototype.getName = function() {
    console.info("Ball name:", this.name);
  };

  function Basketball(name, color) {
    Ball.call(this, name);
    this.color = color;
  }

  Basketball.prototype = new Ball();
  Basketball.prototype.constructor = Basketball;
  Basketball.prototype.getName = function() {
    console.info("Teacher name:", this.name);
  };

  // var basket = new Basketball();
  // console.info(peopleA.interest);
  // console.info(peopleA instanceof Teacher);
  // console.info(peopleA instanceof People);
  // console.info(Teacher.isPrototypeOf(peopleA) );
  // console.info(People.isPrototypeOf(peopleB));

  // console.info("basket", basket);
};

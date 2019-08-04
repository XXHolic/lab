// window.onload = function() {
  function Fruit(name) {
    this.name = name;
  }

  Fruit.prototype.showName = function() {
    console.info("Fruit Name:", this.name);
  };

  function Apple(name, color) {
    Fruit.call(this, name);

    this.color = color;
  }

  Apple.prototype = new Fruit();
  Apple.prototype.constructor = Apple;

  Apple.prototype.showColor = function() {
    console.info("Apple Color:", this.color);
  };

  var apple = new Apple("apple", "green");
  console.info("apple:", apple);
  apple.showName();
  apple.showColor();
// };

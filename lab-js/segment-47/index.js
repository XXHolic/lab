class Person {
  constructor(name='Tom') {
    this.name = name;
  }

  getName() {
    return this.name;
  }
}

class Student extends Person {
  constructor(name='student',age=15) {
    super(name);
    this.age = age;
  }
}

let personA = new Person();
console.info("personA", personA);
let studentA = new Student();
console.info("studentA", studentA);


function People(name='Jery') {
  this.name = name;
}

People.prototype.getName = function() {
  return this.name;
}

var peopleA = new People();

console.info("peopleA", peopleA);
class Person {
  // special method that creates the object (an instance of the class)
  constructor(
    name,
    age = 0,
    height = 0,
    weight = 0,
    mood = 0,
    hamsters = [],
    bankAccount = 0,
  ) {
    // set the properties of the object
    this.name = name;
    this.age = age;
    this.height = height;
    this.weight = weight;
    this.mood = mood;
    this.hamsters = hamsters;
    this.bankAccount = bankAccount;
    // return is not needed because the new object is returned by default
  }
  // instance methods
  getName() {
    return this.name;
  }
  getAge() {
    return this.age;
  }
  getWeight() {
    return this.weight;
  }
  greet() {
    console.log(`Hi, my name is ${this.name}`);
  }
  eat() {
    this.weight++;
    this.mood++;
  }
  exercise() {
    this.weight--;
  }
  ageUp() {
    this.age++;
    this.height++;
    this.weight++;
    this.mood--;
    this.bankAccount += 10;
  }
  buyHamster(hamster) {
    this.hamsters.push(hamster);
    this.mood += 10;
    this.bankAccount -= hamster.getPrice();
  }
}

class Hamster {
  constructor(owner = "", name, price = 15) {
    this.owner = owner;
    this.name = name;
    this.price = price;
  }

  wheelRun() {
    console.log("squeak squeak");
  }
  eatFood() {
    console.log("nibble nibble");
  }
  getPrice() {
    return this.price;
  }
}

const Timmy = new Person("Timmy");

for (let i = 0; i < 5; i++) {
  Timmy.ageUp();
  Timmy.eat();
  Timmy.exercise();
}

for (let i = 0; i < 4; i++) Timmy.ageUp();

const Gus = new Hamster("Timmy", "Gus");
Timmy.buyHamster(Gus);

for (let i = 0; i < 6; i++) Timmy.ageUp();

for (let i = 0; i < 2; i++) {
  Timmy.eat();
  Timmy.exercise();
}

console.log(Timmy);

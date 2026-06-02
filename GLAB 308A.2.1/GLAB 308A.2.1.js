// Part 1
const adventurer = {
  name: "Robin",
  health: 10,
  inventory: ["sword", "potion", "artifact"],
  companion: [
    {
      name: "Leo",
      type: "Cat",
    },
    {
      name: "Frank",
      type: "Flea",
      inventory: ["small hat", "sunglasses"],
    },
  ],
  roll(mod = 0) {
    const result = Math.floor(Math.random() * 20) + 1 + mod;
    console.log(`${this.name} rolled a ${result}.`);
  },
};

//adventurer.roll();

// Part 2
class Character {
  static MAX_HEALTH = 100;

  constructor(name) {
    this.name = name;
    this.health = 100;
    this.inventory = [];
  }

  roll(mod = 0) {
    const result = Math.floor(Math.random() * 20) + 1 + mod;
    console.log(`${this.name} rolled a ${result}.`);
  }

  speak(sound) {
    console.log(sound);
  }
}

//const robin = new Character("Robin");
//robin.inventory = ["sword", "potion", "artifact"];
// robin.companion = new Character("Leo");
// robin.companion.type = "Cat";
// robin.companion.companion = new Character("Frank");
// robin.companion.companion.type = "Flea";
// robin.companion.companion.inventory = ["small hat", "sunglasses"];

// robin.roll();
// robin.companion.roll();
// robin.companion.companion.roll();

// Part 3

const checkRole = (roles, inputRole) =>
  roles.some((role) => role === inputRole);

class Adventurer extends Character {
  static ROLES = ["Fighter", "Healer", "Wizard", "Rogue"];

  constructor(name, role, type) {
    super(name);
    // Adventurers have specialized roles.
    if (checkRole(Adventurer.ROLES, role)) {
      this.role = role;
    } else {
      console.log("You don't have this role in your list");
    }
    this.type = type;
    // Every adventurer starts with a bed and 50 gold coins.
    this.inventory.push("bedroll", "50 gold coins");
  }
  // Adventurers have the ability to scout ahead of them.
  scout() {
    console.log(`${this.name} is scouting ahead...`);
    super.roll();
  }

  speak() {
    super.speak("Hello");
  }

  duel(adventurer) {
    const heroRoll = this.roll();
    const enemyRoll = adventurer.roll();
    let heroHP = this.health;
    let enemyHP = adventurer.health;
    while (heroHP < 50 || enemyHP < 50) {
      if (heroRoll > enemyRoll) {
        enemyRoll--;
        heroHP = this.health - enemyRoll;
      } else {
        heroRoll--;
        enemyHP = adventurer.health - heroRoll;
      }
    }

    return heroHP > enemyHP ? "You are a winner" : "Enemy won";
  }
}

class Companion extends Character {
  constructor(name, type, inventory) {
    super(name);
    this.inventory = inventory;
    this.type = type;
  }

  speak() {
    if (this.type !== "human") super.speak("Meow");
    else super.speak("Hi");
  }
}

const leo = new Companion("Leo", "Cat", ["tail"]);
const frank = new Companion("Frank", "Flea", ["small hat", "sunglasses"]);
const evilRobin = new Adventurer("EvilRobin", "Fighter", "evil");
const robin = new Adventurer("Robin", "Rogue", "human");
console.log(robin.duel(evilRobin));

// Part 5

// class AdventurerFactory {
//   constructor(role) {
//     this.role = role;
//     this.adventurers = [];
//   }
//   generate(name) {
//     const newAdventurer = new Adventurer(name, this.role);
//     this.adventurers.push(newAdventurer);
//   }
//   findByIndex(index) {
//     return this.adventurers[index];
//   }
//   findByName(name) {
//     return this.adventurers.find((a) => a.name === name);
//   }
// }

// const healers = new AdventurerFactory("Healer");
// const robin = healers.generate("Robin");

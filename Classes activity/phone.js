class Phone {
  #batteryLevel = 100;
  #isOn = false;
  #callHistory = [];
  #contacts = [];

  constructor(brand = "", model = "") {
    this.brand = brand;
    this.model = model;
  }

  turnOn() {
    if (this.#batteryLevel > 0) this.#isOn = true;
  }

  turnOff() {
    if (this.#batteryLevel < 0) this.#isOn = false;
  }

  makeCall(contactOrNumber) {
    if (this.isOn) {
      const contact = this.#contacts.find(
        (contact) => contact.name === contactOrNumber,
      );

      if (contact) {
        console.log(
          `calling ${contact.name} and their number is ${contact.number}`,
        );
      } else {
        this.#batteryLevel -= 10;
        this.#callHistory.push({
          contactName: "Name or null if not a contact",
          number: contact.number,
          timeOfCall: new Date(),
        });
      }
    }
  }

  charge(amount) {
    this.#batteryLevel = Math.min(this.#batteryLevel + amount, 100);
  }

  getCallHistroy() {
    return this.#callHistory;
  }

  getInfo() {
    return `brand - ${this.brand}, model - ${this.model}, battery level - ${this.#batteryLevel}, power status - ${this.#isOn}`;
  }

  addContact(name, number) {
    this.#contacts.push({
      name: name,
      number: number,
    });
  }
}

const nokia = new Phone("NOKIA", "3310");
nokia.turnOn();
nokia.makeCall(23);
console.log(nokia.getInfo());

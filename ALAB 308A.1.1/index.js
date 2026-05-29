// Part 1
// var counter = 0;

// function incrementCounter() {
//   counter++;
//   incrementCounter();
// }

// try {
//   incrementCounter();
// } catch (error) {
//   console.error("An error occurred:", error.message);
//   console.log(counter);
// }

// Part 3

// Create a simple HTML element to hold text.
// Cache this HTML element into a JavaScript variable.
// Write a function that takes a parameter n and adds a
// list of all prime numbers between one and n to your HTML element.
// Once complete, use the alert() method to alert the user
// that the calculation is finished.

const simpleHTML = document.querySelector("div");

function isPrime(num) {
  if (num <= 1) return false;

  for (let i = 2; i * i <= num; i++) {
    if (num % i === 0) {
      return false;
    }
  }

  return true;
}

function getListPrimeNumbers(n) {
  const listPrimeNumber = [];

  for (let i = 2; i < n; i++) {
    if (isPrime(i)) {
      listPrimeNumber.push(i);
    }
  }

  return listPrimeNumber;
}

function putSlashN() {
  let arr = getListPrimeNumbers(10000);
  let result = "";

  for (let i = 0; i < arr.length; i++) {
    result += arr[i] + " ";

    if ((i + 1) % 20 === 0) {
      result += "\n";
    }
  }

  simpleHTML.textContent = result;
}

putSlashN();
setTimeout(() => {
  alert("calculation is finished");
}, 1000);

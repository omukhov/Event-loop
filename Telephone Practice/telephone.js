let originalMsg = "one pack two pack three pack four";

const aliceStartsGame = () => {
  return new Promise((resolve) => {
    resolve(originalMsg);
  });
};

const bobWhispers = (message) => {
  return new Promise((resolve) => {
    resolve(message.toUpperCase());
  });
};

const charlieWhispers = (message) => {
  return new Promise((resolve) => {
    resolve(message.replace(/ /g, "-"));
  });
};

const davidWhispers = (message) => {
  return new Promise((resolve, reject) => {
    if (message.length > 40) {
      reject(new Error("David panicked! The message was too long."));
    } else {
      resolve(`${message}!!`);
    }
  });
};

aliceStartsGame().then((message) =>
  bobWhispers(message).then((bobMessage) =>
    charlieWhispers(bobMessage).then((charlieMessage) =>
      davidWhispers(charlieMessage).then((davidMessage) =>
        console.log(davidMessage),
      ),
    ),
  ),
);

// Async/await

async function start() {
  try {
    const message = await aliceStartsGame();
    const bobMessage = await bobWhispers(message);
    const charlieMessage = await charlieWhispers(bobMessage);
    const davidMessage = await davidWhispers(charlieMessage);

    console.log(davidMessage);
  } catch (error) {
    console.error(error);
  }
}

start();

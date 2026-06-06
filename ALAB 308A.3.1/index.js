// Importing database functions. DO NOT MODIFY THIS LINE.
import { central, db1, db2, db3, vault } from "./databases.js";

async function getUserData(id) {
  try {
    const dbs = {
      db1: db1,
      db2: db2,
      db3: db3,
    };

    const returnedValue = await central(id);
    const dbData = await dbs[returnedValue](id);
    const vaultData = await vault(id);

    const result = {
      id,
      name: vaultData.name,
      username: dbData.username,
      email: vaultData.email,
      address: vaultData.address,
      phone: vaultData.phone,
      website: dbData.website,
      company: dbData.company,
    };

    console.log(result);
  } catch (error) {
    throw new Error(error);
  }
}

const getRandomNumber = () => {
  const randomNumber = Math.floor(Math.random() * 10) + 1;
  getUserData(randomNumber);
};

getRandomNumber();

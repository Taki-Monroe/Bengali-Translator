// users.js

const fs = require('fs').promises;
const path = require('path');
const userDataPath = path.join(__dirname, 'userData.json');

let users = [];

async function readUserData() {
  try {
    const data = await fs.readFile(userDataPath, 'utf8');
    users = JSON.parse(data);
  } catch (err) {
    console.error(err);
  }
}

async function writeUserData() {
  try {
    const data = JSON.stringify(users, null, 2);
    await fs.writeFile(userDataPath, data);
  } catch (err) {
    console.error(err);
  }
}

readUserData();

function addUser(username, password) {
  if (!username || !password) {
    throw new Error('Username and password are required.');
  }
  const user = { username, password, patterns: 0 };
  users.push(user);
  writeUserData();
}

function getUser(username) {
  const user = users.find(user => user.username === username);
  if (!user) {
    throw new Error('User not found.');
  }
  return user;
}

module.exports = {
  addUser,
  getUser,
  users
};

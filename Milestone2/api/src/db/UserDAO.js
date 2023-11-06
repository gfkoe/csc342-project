// data for user accounts
let users = require("./data/users.json");

function findUserByUsername(username) {
  return users.find((user) => user.username === username);
}

function createUser(username, password) {
  const existingUser = findUserByUsername(username);
  if (existingUser) {
    // User with the same username already exists
    return null;
  }

  const newUser = {
    username,
    password,
  };

  users.push(newUser);
  return newUser;
}

function authenticateUser(username, password) {
  const user = findUserByUsername(username);

  if (user && user.password === password) {
    return user;
  } else {
    return null; // Authentication failed
  }
}

module.exports = {
  findUserByUsername,
  createUser,
  authenticateUser,
};

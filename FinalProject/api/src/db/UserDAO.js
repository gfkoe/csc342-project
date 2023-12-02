const db = require("./DBConnection");
const User = require("./models/User");
const crypto = require("crypto");
function getUserByCredentials(username, password) {
  return db
    .query("SELECT * FROM user WHERE usr_username=?", [username])
    .then(({ results }) => {
      const user = new User(results[0]);
      if (user) {
        // we found our user
        return user.validatePassword(password);
      } else {
        // if no user with provided username
        throw new Error("No such user");
      }
    });
}

function getUserById(userId) {
  return db
    .query("SELECT * FROM user WHERE usr_id=?", [userId])
    .then(({ results }) => {
      const user = new User(results[0]);
      if (user) {
        return user;
      } else {
        throw new Error("No such user");
      }
    });
}

function userExists(username) {
  return db
    .query("SELECT * FROM user WHERE usr_username=?", [username])
    .then(({ results }) => {
      console.log("Check if user exists");
      return results.length > 0;
    });
}

function createUser(user) {
  let salt = crypto.randomBytes(16).toString("hex");
  let hash = crypto
    .pbkdf2Sync(user.password, salt, 100000, 64, "sha512")
    .toString("hex");
  console.log("generated salt:", salt);
  console.log("generated hash:", hash);
  console.log("user:", user);
  const avatar = `https://robohash.org/${user.username}.png?size=64x64&set=set1`;

  return userExists(user.username)
    .then((exists) => {
      if (exists) {
        throw new Error("Username taken");
      }
      return db.query(
        "INSERT INTO user (usr_first_name, usr_last_name, usr_username, usr_password, usr_salt, usr_avatar) VALUES (?, ?, ?, ?, ?, ?)",
        [user.first, user.last, user.username, hash, salt, avatar]
      );
    })
    .then(({ results }) => {
      console.log("Successfully registered:", results);
      return getUserById(results.insertId);
    })
    .catch((error) => {
      console.error("Error Registering:", error);
      throw error;
    });
}

module.exports = {
  getUserByCredentials: getUserByCredentials,
  getUserById: getUserById,
  createUser: createUser,
};

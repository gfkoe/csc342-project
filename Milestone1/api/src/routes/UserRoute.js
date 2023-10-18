const express = require("express");
const userRouter = express.Router();
const UserDAO = require("../db/UserDAO.js");

// User registration endpoint
userRouter.post("/register", (req, res) => {
  const { username, password } = req.body;
  const newUser = UserDAO.createUser(username, password);
  if (newUser) {
    res.json({ message: "User registered successfully" });
  } else {
    res.status(400).json({ error: "User already exists" });
  }
});

// User login endpoint
userRouter.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = UserDAO.authenticateUser(username, password);
  if (user) {
    res.json({ message: "User logged in successfully" });
  } else {
    res.status(401).json({ error: "Authentication failed" });
  }
});

module.exports = userRouter;
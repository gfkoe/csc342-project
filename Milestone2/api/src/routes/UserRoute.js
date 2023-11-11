const express = require("express");
const cookieParser = require("cookie-parser");
const userRouter = express.Router();

userRouter.use(cookieParser());
userRouter.use(express.json());

const path = require("path");
// frontendRouter.use(express.static('static'));
// frontendRouter.use(express.urlencoded({extended: true}));
// const html_dir = path.join(__dirname, '../../templates/');

const {
  TokenMiddleware,
  generateToken,
  removeToken,
} = require("../middleware/TokenMiddleware");

userRouter.get("/", (req, res) => {
  res.sendFile(`${html_dir}index.html`);
});

userRouter.get("/error", (req, res) => {
  res.sendFile(`${html_dir}error.html`);
});

userRouter.get("/login", (req, res) => {
  res.sendFile(`${html_dir}login.html`);
});

const UserDAO = require("../db/UserDAO");

userRouter.post("/users/login", (req, res) => {
  if (req.body.username && req.body.password) {
    UserDAO.getUserByCredentials(req.body.username, req.body.password)
      .then((user) => {
        let result = {
          user: user,
        };

        generateToken(req, res, user);

        res.json(result);
      })
      .catch((err) => {
        res.status(401).json({ error: err });
      });
  } else {
    res.status(401).json({ error: "Not authenticated" });
  }
});

userRouter.post("/users/logout", (req, res) => {
  removeToken(req, res);

  res.json({ success: true });
});

userRouter.get("/users/current", TokenMiddleware, (req, res) => {
  res.json(req.user);
});

userRouter.get("/users/:userId", (req, res) => {
  const id = req.params.userId;
  UserDAO.getUserById(id)
    .then((user) => {
      let result = {
        user: user,
      };
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(err.code).json({ error: err.message });
    });
});
module.exports = userRouter;

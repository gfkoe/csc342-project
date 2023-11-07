const express = require("express");
const cookieParser = require("cookie-parser");
const userRouter = express.Router();

const path = require("path");
// frontendRouter.use(express.static('static'));
// frontendRouter.use(express.urlencoded({extended: true}));
// const html_dir = path.join(__dirname, '../../templates/');

frontendRouter.get("/", (req, res) => {
  res.sendFile(`${html_dir}index.html`);
});

frontendRouter.get("/error", (req, res) => {
  res.sendFile(`${html_dir}error.html`);
});

frontendRouter.get("/login", (req, res) => {
  res.sendFile(`${html_dir}login.html`);
});

const UserDAO = require("./db/UserDAO");

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
        console.log(err);
        res.status(err.code).json({ error: err.message });
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

module.exports = userRouter;

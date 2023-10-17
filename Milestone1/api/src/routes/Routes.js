const express = require("express");
const teamRouter = require("./TeamRoute.js");
const userRouter = require("./UserRoute.js");

const routes = express.Router();

routes.use("/teams", teamRouter);
routes.use("/users", userRouter);

app.get("/", (req, res) => {
  res.json({ your_api: "it works" });
});

module.exports = routes;

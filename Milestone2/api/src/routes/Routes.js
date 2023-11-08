const express = require("express");
const teamRouter = require("./TeamRoute.js");
const userRouter = require("./UserRoute.js");

const routes = express.Router();

routes.use(teamRouter);
routes.use(userRouter);

routes.get("/", (req, res) => {
  res.json({ your_api: "it works" });
}); //FIXME

module.exports = routes;

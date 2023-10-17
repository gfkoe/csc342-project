const express = require("express");
const teamRouter = require("./TeamRoute.js");
const userRouter = require("./UserRoute.js");

const routes = express.Router();

routes.use("/teams", teamRouter);
routes.use("/users", userRouter);

module.exports = routes;

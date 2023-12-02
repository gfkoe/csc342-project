const express = require("express");
const teamRouter = require("./TeamRoute");
const userRouter = require("./UserRoute");
const gameRouter = require("./GameRoute");

const routes = express.Router();
routes.use(teamRouter);
routes.use(userRouter);
routes.use(gameRouter);

// routes.get("/", (req, res) => {
//   res.json({ your_api: "it works" });
// }); //FIXME

module.exports = routes;

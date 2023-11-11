const express = require("express");
const teamRouter = require("./TeamRoute");
const userRouter = require("./UserRoute");

const routes = express.Router();
routes.use(teamRouter);
routes.use(userRouter);

// routes.get("/", (req, res) => {
//   res.json({ your_api: "it works" });
// }); //FIXME

module.exports = routes;

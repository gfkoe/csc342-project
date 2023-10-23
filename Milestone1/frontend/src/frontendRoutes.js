const express = require("express");
const frontendRouter = express.Router();

const html_dir = __dirname + "/";

frontendRouter.get("/", (req, res) => {
  res.sendFile(`${html_dir}home.html`);
});

frontendRouter.get("/login", (req, res) => {
  res.sendFile(`${html_dir}login.html`);
});

frontendRouter.get("/mlb", (req, res) => {
  res.sendFile(`${html_dir}mlb.html`);
});

frontendRouter.get("/mls", (req, res) => {
  res.sendFile(`${html_dir}mls.html`);
});

frontendRouter.get("/nba", (req, res) => {
  res.sendFile(`${html_dir}nba.html`);
});

frontendRouter.get("/nfl", (req, res) => {
  res.sendFile(`${html_dir}mlb.html`);
});

frontendRouter.get("/settings", (req, res) => {
  res.sendFile(`${html_dir}settings.html`);
});

frontendRouter.get("/tp", (req, res) => {
  res.sendFile(`${html_dir}tp.html`);
});

module.exports = frontendRouter;

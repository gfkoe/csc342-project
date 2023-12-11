const express = require("express");
const teamRouter = express.Router();
const TeamDAO = require("../db/TeamDAO.js");

// REMEMBER WE MIGHT NEED TO PASS TOKEN MIDDLEWARE

// Endpoint to get a team by name
teamRouter.get("/teams/names/:teamName", (req, res) => {
  let team_name = req.params.teamName;
  //
  TeamDAO.getTeamByName(team_name).then(team => {
    res.json(team);
  }).catch(error => {
    res.status(400).json({error: error});
  });
});

// Endpoint to get a team by id
teamRouter.get("/teams/:teamId", (req, res) => {
  //
  let team_id = req.params.teamId;
  TeamDAO.getTeamByID(team_id).then(team => {
    res.json(team);
  }).catch(error => {
    res.status(400).json({error: error});
  });
});

teamRouter.put("/teams/logo/:teamName", (req, res) => {
  let team_name = req.params.teamName;
  let logo = req.body;

  TeamDAO.addTeamLogo(team_name, logo).then(res => {
    console.log(res);
    return;
  }).catch(error => {
    res.status(400).json({error: error});
  });
});

module.exports = teamRouter;

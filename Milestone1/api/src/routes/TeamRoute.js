const express = require("express");
const teamRouter = express.Router();
const TeamDAO = require("../db/TeamDAO.js");

// Endpoint to get schedules for a specific league
teamRouter.get("/leagues/:leagueId/schedule", (req, res) => {
    const leagueId = req.params.leagueId;
    // Retrieve schedule data for the specified league (mock data)
    const schedule = TeamDAO.getScheduleForLeague(leagueId);
    res.json(schedule);
  });

// Endpoint to get live scoring updates for a specific game
teamRouter.get("/games/:gameId/score", (req, res) => {
    const gameId = req.params.gameId;
    // Retrieve live scoring data for the specified game (mock data)
    const liveScore = TeamDAO.getLiveScoreForGame(gameId);
    res.json(liveScore);
  });

// Endpoint to get information about a specific team
teamRouter.get("/teams/:teamId", (req, res) => {
    const teamId = req.params.teamId;
    // Retrieve team information (mock data)
    const teamInfo = TeamDAO.getTeamInfo(teamId);
    res.json(teamInfo);
  });

module.exports = teamRouter;

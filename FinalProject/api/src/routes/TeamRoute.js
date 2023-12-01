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
teamRouter.get("/teams/:leagueName/:teamName", (req, res) => {
  // const teamId = req.params.teamId;
  // // Retrieve team information (mock data)
  // const nflInfo = TeamDAO.getNflTeamInfo(teamId);
  // const nbaInfo = TeamDAO.getNbaTeamInfo(teamId);
  // const mlbInfo = TeamDAO.getMlbTeamInfo(teamId);
  // const mlsInfo = TeamDAO.getMlsTeamInfo(teamId);
  // res.json(nflInfo);
  // res.json(nbaInfo);
  // res.json(mlbInfo);
  // res.json(mlsInfo);
  let league_name = req.params.leagueName;

  console.log("League Name: " + league_name);

  let ret;

  if(league_name == "NFL") {
    // var myHeaders = new Headers();
    // myHeaders.append("x-rapidapi-key", "929d82020297d246d0b2234faa3df3e8");
    // myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");
    let team_name = req.params.teamName;
    console.log("Team Name: " + team_name);
    let id = 14;
    fetch(`https://v1.american-football.api-sports.io/teams?id=${id}`, {
	    "method": "GET",
	    "headers": {
		  "x-rapidapi-host": "v1.american-football.api-sports.io",
		  "x-rapidapi-key": "929d82020297d246d0b2234faa3df3e8"
	    }
    })
    .then(response => {
  	  //console.log(response);
      console.log(response.status);
      // console.log(response.text().json());
      // ret = response;
      return response.json();
    }).then(result => {
      // this is the data returned from the external API call
      // return this as json data for our original fetch call
      return res.json(result);
    })
    .catch(err => {
  	  console.log(err);
    });

  }
});

module.exports = teamRouter;

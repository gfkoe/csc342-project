const express = require("express");
const gameRouter = express.Router();
const GamesDAO = require("../db/GamesDAO");
const TeamDAO = require("../db/TeamDAO.js");

// REMEMBER WE MIGHT NEED TO PASS TOKEN MIDDLEWARE

// Endpoint to initialize games table in database
gameRouter.post("/games/intialize", (req, res) => {
  // Get all games for all leagues and updates teams in database
  // with logos returned

  fetch("https://v1.american-football.api-sports.io/games?league=1&season=2023", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "v1.american-football.api-sports.io",
		"x-rapidapi-key": "929d82020297d246d0b2234faa3df3e8"
	}
})
.then(response => {
	console.log(response.status);
    return response.json();
})
.then(result => console.log(result))
.catch(err => {
	console.log(err);
});

//   // Get all games for NFL
//   fetch(`https://v1.american-football.api-sports.io/teams?id=${id}`, {
//     "method": "GET",
//     "headers": {
//       "x-rapidapi-host": "v1.american-football.api-sports.io",
//       "x-rapidapi-key": "929d82020297d246d0b2234faa3df3e8"
//     }
//   })
//   .then(response => {
//   console.log(response.status);
//   return response.json();
//   }).then(result => {
//     console.log(result);
//   })
//   .catch(err => {
//     console.log(err);
//   });

  // Get all games for MLB

  // Get all games for MLS

  // Get all games for NBA
});

// Endpoint to get all games for a team with an id
gameRouter.get("/games/team/:teamId", (req, res) => {

});

// Endpoint to get all games by a week number
gameRouter.get("/games/:weekNumber", (req, res) => {

});

// Endpoint to update a game after it is completed
gameRouter.put("/games/update", (req, res) => {

});

gameRouter.get("/games/all", (req, res) => {

});

module.exports = gameRouter;
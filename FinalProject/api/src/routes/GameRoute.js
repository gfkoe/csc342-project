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
		"x-rapidapi-key": process.env.EXTERNAL_API_KEY
	}
  })
  .then(response => {
	  console.log(response.status);
    return response.json();
  })
  .then(data => {
    let idx = 0;
    for(let i = 0; i < data.response.length; i++) {
      let game = {};

      game.league = 'NFL';
      game.date = data.response[i].game.date["date"];
      game.time = data.response[i].game.date["time"];
      game.timestamp = data.response[i].game.date["timestamp"];
      game.stage = data.response[i].game["stage"];
      game.week = data.response[i].game["week"];
      game.home_team_name = data.response[i].teams.home["name"];
      game.away_team_name = data.response[i].teams.away["name"];
      game.status = data.response[i].game.status["short"];

      if(game.status == null) {
        game.status = '';
      }

      if(game.home_team_name == null) {
        game.home_team_name = '';
      }

      if(game.away_team_name == null) {
        game.away_team_name = '';
      }

      let ht_logo = data.response[i].teams.home["logo"];
      let at_logo = data.response[i].teams.away["logo"];

      TeamDAO.addTeamLogo(game.home_team_name, ht_logo).then(result => {
      }).catch(err => {
        console.log("Couldn't update team with logo " + game.home_team_name);
      });

      TeamDAO.addTeamLogo(game.away_team_name, at_logo).then(result => {
      }).catch(err => {
        console.log("Couldn't update team with logo " + game.away_team_name);
      });

      if(game.status == "NS") {
        game.final_home_score = 0;
        game.final_away_score = 0;

        // call game endpoint
        GamesDAO.addGame(game).then(result => {
          // console.log("Game Added!");
        }).catch(err => {
           console.log("Stage " + data.response[i].game["stage"]);
           console.log("Week " + game.week);
           console.log("Home Team " + game.home_team_name);
           console.log("Away Team " + game.away_team_name);
           console.log("Date " + game.date );
           console.log("Time " + game.time);
           console.log("Status " + game.status);
           console.log("Timestamp " + game.timestamp);
           console.log("Home Team Score " + game.final_home_score);
           console.log("Away Team Score " + game.final_away_score);
        });
    }

    else {
      game.final_home_score = data.response[i].scores.home["total"];
      game.final_away_score = data.response[i].scores.away["total"];

      //
      GamesDAO.addGame(game).then(result => {
        // console.log("Game Added!");
        }).catch(err => {
          console.log("Stage " + data.response[i].game["stage"]);
          console.log("Week " + game.week);
          console.log("Home Team " + game.home_team_name);
          console.log("Away Team " + game.away_team_name);
          console.log("Date " + game.date );
          console.log("Time " + game.time);
          console.log("Status " + game.status);
          console.log("Timestamp " + game.timestamp);
          console.log("Home Team Score " + game.final_home_score);
          console.log("Away Team Score " + game.final_away_score);
        });
    }
  }
})
// gets size of response array -> console.log(result.response.length)
.catch(err => {
	console.log(err);
});

// Get all games for MLB
fetch("https://v1.baseball.api-sports.io/games?season=2023&league=1", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "https://v1.baseball.api-sports.io",
		"x-rapidapi-key": process.env.EXTERNAL_API_KEY
	}
  })
  .then(response => {
	  console.log(response.status);
    return response.json();
  }).then(data => {
    // expect 2940 as the size
    console.log("MLB Games Size: " + data.response.length);
    
    for(let i = 0; i < data.response.length; i++) {
      let game = {};
      game.league = 'MLB';
      let game_date = new Date(data.response[i]["date"]);
      // console.log(game_date);
      let game_year = game_date.getUTCFullYear();
      // console.log(game_year);
      let game_month = game_date.getUTCMonth() + 1;
      // console.log(game_month);

      if(game_month <= 9) {
        game_month = "0" + game_month;
      }

      let game_day = game_date.getUTCDate();

      if(game_day <= 9) {
        game_day = "0" + game_day;
      }

      game.date = game_year + "-" + game_month + "-" + game_day;
      // console.log("Game Date: " + game.date);
      game.time = data.response[i]["time"];
      // console.log("Game Time: " + game.date);
      game.timestamp = data.response[i]["timestamp"];
      // console.log("Game TimeStamp: " + game.timestamp);
      game.stage = "";
      // console.log("Game Stage: " + game.stage);
      game.week = data.response[i]["week"];
      // console.log("Game Week: " + game.week);

      if(game.week == null) {
        game.week = "";
      }

      game.home_team_name = data.response[i].teams.home["name"];
      // console.log("Game Home Team Name: " + game.home_team_name);
      game.away_team_name = data.response[i].teams.away["name"];
      // console.log("Game Away Team Name: " + game.away_team_name);
      game.status = data.response[i].status["short"];
      // console.log("Game Status: " + game.home_team_name);

      let ht_logo = data.response[i].teams.home["logo"];
      // console.log("Game Home Logo: " + ht_logo);
      let at_logo = data.response[i].teams.away["logo"];
      // console.log("Game Away Logo: " + at_logo);

      TeamDAO.addTeamLogo(game.home_team_name, ht_logo).then(result => {
      }).catch(err => {
        console.log("Couldn't update team with logo " + game.home_team_name);
      });

      TeamDAO.addTeamLogo(game.away_team_name, at_logo).then(result => {
      }).catch(err => {
        console.log("Couldn't update team with logo " + game.home_team_name);
      });

      if(game.status == "NS") {
        game.final_home_score = 0;
        game.final_away_score = 0;

        GamesDAO.addGame(game).then(result => {
          // console.log("Game Added!");
          }).catch(err => {
            console.log("Week " + game.week);
            console.log("Home Team " + game.home_team_name);
            console.log("Away Team " + game.away_team_name);
            console.log("Date " + game.date );
            console.log("Time " + game.time);
            console.log("Status " + game.status);
            console.log("Timestamp " + game.timestamp);
            console.log("Home Team Score " + game.final_home_score);
            console.log("Away Team Score " + game.final_away_score);
          });
      }

      else {
        game.final_home_score = data.response[i].scores.home["total"];
        // console.log("Game Home Team Score: " + game.final_home_score);
        game.final_away_score = data.response[i].scores.away["total"];
        // console.log("Game Away Team Score: " + game.final_away_score);

        if(game.final_home_score == null) {
          game.final_home_score = 0;
        }

        if(game.final_away_score == null) {
          game.final_away_score = 0;
        }

        GamesDAO.addGame(game).then(result => {
          // console.log("Game Added!");
          }).catch(err => {
            console.log("Week " + game.week);
            console.log("Home Team " + game.home_team_name);
            console.log("Away Team " + game.away_team_name);
            console.log("Date " + game.date );
            console.log("Time " + game.time);
            console.log("Status " + game.status);
            console.log("Timestamp " + game.timestamp);
            console.log("Home Team Score " + game.final_home_score);
            console.log("Away Team Score " + game.final_away_score);
          });
      }
    }
  })
  .catch(err => {
    console.log("Error getting MLB games");
  });

// Get all games for MLS
fetch("https://v3.football.api-sports.io/fixtures?season=2023&league=253", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "https://v3.football.api-sports.io",
		"x-rapidapi-key": process.env.EXTERNAL_API_KEY
	}
  })
  .then(response => {
	  console.log(response.status);
    return response.json();
  }).then(data => {
    // expect 526 as the size
    console.log("MLS Games Size: " + data.response.length);
    for(let i = 0; i < data.response.length; i++) {
      let game = {};
      game.league = 'MLS';
      let game_date = new Date(data.response[i].fixture["date"]);
      // console.log(game_date);
      let game_year = game_date.getUTCFullYear();
      // console.log(game_year);
      let game_month = game_date.getUTCMonth() + 1;
      // console.log(game_month);

      if(game_month <= 9) {
        game_month = "0" + game_month;
      }

      let game_day = game_date.getUTCDate();

      if(game_day <= 9) {
        game_day = "0" + game_day;
      }

      let game_hours = game_date.getUTCHours();
      let game_minutes = game_date.getUTCMinutes();
      // console.log("Hours " + game_hours );
      // console.log("Minutes " + game_minutes);

      if(game_hours <= 9) {
        game_hours = "0" + game_hours;
      }

      if(game_minutes <= 9) {
        game_minutes = "0" + game_minutes;
      }

      game.date = game_year + "-" + game_month + "-" + game_day;
      // console.log("Date: " + game.date);
      // console.log("Game Date: " + game.date);
      game.time = game_hours + ":" + game_minutes;
      // console.log("Time: " + game.time);
      // console.log("Game Time: " + game.date);
      game.timestamp = data.response[i].fixture["timestamp"];
      // console.log("Timestamp: " + game.timestamp);
      // console.log("Game TimeStamp: " + game.timestamp);
      game.stage = "";
      //
      game.week = "";

      game.home_team_name = data.response[i].teams.home["name"];
      // console.log("Home Team Name: " + game.home_team_name);
      game.away_team_name = data.response[i].teams.away["name"];
      // console.log("Away Team Name: " + game.away_team_name);

      game.status = data.response[i].fixture.status["short"];
      // console.log("Status: " + game.status);

      let ht_logo = data.response[i].teams.home["logo"];
      // console.log("Game Home Logo: " + ht_logo);
      let at_logo = data.response[i].teams.away["logo"];
      // console.log("Game Away Logo: " + at_logo);

      TeamDAO.addTeamLogo(game.home_team_name, ht_logo).then(result => {
      }).catch(err => {
        console.log("Couldn't update team with logo " + game.home_team_name);
      });

      TeamDAO.addTeamLogo(game.away_team_name, at_logo).then(result => {
      }).catch(err => {
        console.log("Couldn't update team with logo " + game.home_team_name);
      });

      if(game.status == "NS") {
        game.final_home_score = 0;
        game.final_away_score = 0;

        GamesDAO.addGame(game).then(result => {
          // console.log("Game Added!");
          }).catch(err => {
            console.log("Week " + game.week);
            console.log("Home Team " + game.home_team_name);
            console.log("Away Team " + game.away_team_name);
            console.log("Date " + game.date );
            console.log("Time " + game.time);
            console.log("Status " + game.status);
            console.log("Timestamp " + game.timestamp);
            console.log("Home Team Score " + game.final_home_score);
            console.log("Away Team Score " + game.final_away_score);
          });
      }

      else {
        game.final_home_score = data.response[i].goals["home"];
        game.final_away_score = data.response[i].goals["away"];

        if(game.final_home_score == null) {
          game.final_home_score = 0;
        }

        if(game.final_away_score == null) {
          game.final_away_score = 0;
        }

        GamesDAO.addGame(game).then(result => {
          // console.log("Game Added!");
          }).catch(err => {
            console.log("Week " + game.week);
            console.log("Home Team " + game.home_team_name);
            console.log("Away Team " + game.away_team_name);
            console.log("Date " + game.date );
            console.log("Time " + game.time);
            console.log("Status " + game.status);
            console.log("Timestamp " + game.timestamp);
            console.log("Home Team Score " + game.final_home_score);
            console.log("Away Team Score " + game.final_away_score);
          });
      }
    }
  })
  .catch(err => {
    console.log("Error getting MLS games");
  });

// Get all games for NBA
fetch("https://v1.basketball.api-sports.io/games?league=12&season=2023-2024", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "https://v1.basketball.api-sports.io",
		"x-rapidapi-key": process.env.EXTERNAL_API_KEY
	}
  })
  .then(response => {
	  console.log(response.status);
    return response.json();
  }).then(data => {
    // expect 1288 as the size
    console.log("NBA Games Size: " + data.response.length);

    for(let i = 0; i < data.response.length; i++) {
      let game = {};
      game.league = 'NBA';
      let game_date = new Date(data.response[i]["date"]);
      // console.log(game_date);
      let game_year = game_date.getUTCFullYear();
      // console.log(game_year);
      let game_month = game_date.getUTCMonth() + 1;
      // console.log(game_month);

      if(game_month <= 9) {
        game_month = "0" + game_month;
      }

      let game_day = game_date.getUTCDate();

      if(game_day <= 9) {
        game_day = "0" + game_day;
      }

      game.date = game_year + "-" + game_month + "-" + game_day;
      // console.log("Date: " + game.date);
      game.week = data.response[i]["week"];
      // console.log("Week: " + game.week);

      if(game.week == null) {
        game.week = "";
      }

      game.stage = data.response[i]["stage"];
      // console.log("Stage: " + game.stage);

      if(game.stage == null) {
        game.stage = "";
      }

      game.timestamp = data.response[i]["timestamp"];
      // console.log("Timestamp: " + game.timestamp);

      game.time = data.response[i]["time"];
      // console.log("Time: " + game.time);

      game.status = data.response[i].status["short"];
      // console.log("Status: " + game.status);

      game.home_team_name = data.response[i].teams.home["name"];
      // console.log("Home Team Name: " + game.home_team_name);
      game.away_team_name = data.response[i].teams.away["name"];
      // console.log("Away Team Name: " + game.away_team_name);

      let ht_logo = data.response[i].teams.home["logo"];
      let at_logo = data.response[i].teams.away["logo"];

      TeamDAO.addTeamLogo(game.home_team_name, ht_logo).then(result => {
      }).catch(err => {
        console.log("Couldn't update team with logo " + game.home_team_name);
      });

      TeamDAO.addTeamLogo(game.away_team_name, at_logo).then(result => {
      }).catch(err => {
        console.log("Couldn't update team with logo " + game.home_team_name);
      });

      if(game.status == "NS") {
        game.final_home_score = 0;
        game.final_away_score = 0;

        GamesDAO.addGame(game).then(result => {
          // console.log("Game Added!");
          }).catch(err => {
            console.log("Week " + game.week);
            console.log("Home Team " + game.home_team_name);
            console.log("Away Team " + game.away_team_name);
            console.log("Date " + game.date );
            console.log("Time " + game.time);
            console.log("Status " + game.status);
            console.log("Timestamp " + game.timestamp);
            console.log("Home Team Score " + game.final_home_score);
            console.log("Away Team Score " + game.final_away_score);
          });
      }

      else {
        game.final_home_score = data.response[i].scores.home["total"];
        game.final_away_score = data.response[i].scores.away["total"];

        if(game.final_home_score == null) {
          game.final_home_score = 0;
        }

        if(game.final_away_score == null) {
          game.final_away_score = 0;
        }

        GamesDAO.addGame(game).then(result => {
          // console.log("Game Added!");
          }).catch(err => {
            console.log("Week " + game.week);
            console.log("Home Team " + game.home_team_name);
            console.log("Away Team " + game.away_team_name);
            console.log("Date " + game.date );
            console.log("Time " + game.time);
            console.log("Status " + game.status);
            console.log("Timestamp " + game.timestamp);
            console.log("Home Team Score " + game.final_home_score);
            console.log("Away Team Score " + game.final_away_score);
          });
      }
    }
  })
  .catch(err => {
    console.log("Error getting NBA games");
  });

  res.json({success: true});
});

// Endpoint to get all games for a team with an id
gameRouter.get("/games/team/:teamId", (req, res) => {
  let team_id = req.params.teamId;

  GamesDAO.getGamesForTeamWithID(team_id).then(result => {
    res.json(result);
  }).catch(err => {
    console.log("Could not find team with id: " + team_id );
  })
});

gameRouter.get("/games/date/:teamName/:dateVal", (req, res) => {
  let name = req.params.teamName;
  let date = req.params.dateVal;
  console.log("Name in API: " + name);
  console.log("Date in API: " + date);
  GamesDAO.getGameByDateForTeam(name, date).then(result => {
    res.json(result);
  }).catch(err => {
    console.log("Error finding games by date for team with name " + name);
  })
});

// 
gameRouter.get("/games/schedule/:teamName", (req, res) => {
  let name = req.params.teamName;

  GamesDAO.getScheduleInOrder(name).then(result => {
    res.json(result);
  }).catch(err => {
    console.log("Error searching for games for by date for team name: " + name);
  });
});

// Endpoint to update a game after it is completed
gameRouter.put("/games/update", (req, res) => {
  let game = req.body;

  GamesDAO.updateGame(game.id, game.status, game.final_home_score, game.final_away_score).then(result => {
    res.json({success: true});
  }).catch(err => {
    console.log("Error updating game");
  });
});

gameRouter.get("/games/checksize", (req, res) => {
  GamesDAO.getAllGames().then(result => {
    if(result.length > 0) {
      res.json({empty: false});
    }

    else {
      res.json({empty: true});
    }
  }).catch(err => {
    console.log("Could not get all games");
  });
});

gameRouter.get("/games/live/:leagueName/:dateVal", (req, res) => {
  let league_name = req.params.leagueName;
  // some of the external apis for leagues (ex: NBA) don't seem to have a dedicated
  // live game api call we can use a date when we know we should have a live game on a
  let game_date = req.params.dateVal;

  if(league_name == "NFL") {
    fetch("https://v1.american-football.api-sports.io/games?league=1&season=2023&live=all", {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "v1.american-football.api-sports.io",
        "x-rapidapi-key": process.env.EXTERNAL_API_KEY
      }
      })
      .then(response => {
        console.log(response.status);
        return response.json();
      })
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        console.log("Error fetching live nfl games");
      });
  }

  else if(league_name == "NBA") {
    fetch(`https://v1.basketball.api-sports.io/games?season=2023-2024&league=12&date=${game_date}`, {
	  "method": "GET",
	  "headers": {
		  "x-rapidapi-host": "https://v1.basketball.api-sports.io",
		  "x-rapidapi-key": process.env.EXTERNAL_API_KEY
	  }
    })
    .then(response => {
	    console.log(response.status);
      return response.json();
    }).then(data => {
      res.json(data);
    })
    .catch(err => {
      console.log("Error getting NBA games");
    });
  }

  else if(league_name == "MLB") {
    fetch(`https://v1.baseball.api-sports.io/games?season=2023&league=1&date=${game_date}`, {
	  "method": "GET",
	  "headers": {
		  "x-rapidapi-host": "https://v1.baseball.api-sports.io",
		  "x-rapidapi-key": process.env.EXTERNAL_API_KEY
	  }
    })
    .then(response => {
	    console.log(response.status);
      return response.json();
    }).then(data => {
      res.json(data);
    });
  }

  else if(league_name == "MLS") {
    fetch(`https://v3.football.api-sports.io/fixtures?season=2023&league=253&date=${game_date}`, {
	  "method": "GET",
	  "headers": {
		  "x-rapidapi-host": "https://v3.football.api-sports.io",
		  "x-rapidapi-key": process.env.EXTERNAL_API_KEY
	  }
    })
    .then(response => {
	    console.log(response.status);
      return response.json();
    }).then(data => {
      res.json(data);
    });
  }
});

module.exports = gameRouter;
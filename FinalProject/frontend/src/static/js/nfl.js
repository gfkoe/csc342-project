import api from "./APIClient.js";

document.addEventListener('DOMContentLoaded', (e) => {
    // interval id for function that checks db to see if we have live games (check every 5 minutes)
    let live_games_check_inv_id = setInterval(checkForLiveGames, 1000 * 60 * 5);

    // interval id for function that checks external api for live games updates
    let live_games_inv_id = null;

    // id for the current team page in the database
    let id;

    // keeps track of the current game we are getting updates for and can also
    // be used to determine when the game is no longer live and when we have a live game in general
    let live_game_id = null;

    let live_game = {};

    // create js elements that can be updated on each function call when we have live games

    let settings_button = document.querySelector("#settingsBtn");
    let signIn_button = document.querySelector("#signInBtn");
    let home_button = document.querySelector("#home");
    let profile_picture = document.querySelector("#profilePic");

    profile_picture.addEventListener("click", (e) => {
      // clear intervals
      if(live_games_check_inv_id != null) {
        clearInterval(live_games_check_inv_id);
        live_games_check_inv_id = null;
      }

      else if(live_games_inv_id != null) {
        clearInterval(live_games_inv_id);
        live_games_inv_id = null;
      }

      document.location = "/account";
    });
    settings_button.addEventListener('click', (e) => {
        // clear intervals
        if(live_games_check_inv_id != null) {
            clearInterval(live_games_check_inv_id);
            live_games_check_inv_id = null;
        }

        else if(live_games_inv_id != null) {
            clearInterval(live_games_inv_id);
            live_games_inv_id = null;
        }
        document.location = "/settings";
    });

    signIn_button.addEventListener('click', (e) => {
        // clear intervals
        if(live_games_check_inv_id != null) {
            clearInterval(live_games_check_inv_id);
            live_games_check_inv_id = null;
        }

        else if(live_games_inv_id != null) {
            clearInterval(live_games_inv_id);
            live_games_inv_id = null;
        }

        document.location = "/login";
    });

    home_button.addEventListener('click', (e) => {
        api.checkGamesSize().then(result => {
            if(result.empty) {
                // populate the db
                api.initialize().then(response => {
                    console.log(response);
                }).catch(err => {
                    console.log(err);
                });
            }
        }).catch(err => {
            console.log("Error checking games db size");
        })
        // document.location = "/";
    });

    function checkForLiveGames() {
        // for testing (this should be based on teampage id in query (path))
        // this the id of the San Fransisco 49ers
        id = 28;
        console.log("Team ID: " + id );
        api.getTeamById(id).then(result => {
            // use this to get current date
            let cr_date = new Date();
            // use this for comparison against database date
            let cr_date_str = "";
            //
            let cr_date_time_str = "";
            //
            let cr_date_time_hours = cr_date.getUTCHours();
            //
            let cr_date_time_minutes = cr_date.getUTCMinutes();
            //

            if(cr_date_time_hours <= 9) {
                cr_date_time_hours = "0" + cr_date_time_hours;
            }

            if(cr_date_time_minutes <= 9) {
                cr_date_time_minutes = "0" + cr_date_time_minutes;
            }


            let cr_date_month = cr_date.getUTCMonth() + 1;

            if(cr_date_month <= 9) {
                cr_date_month = "0" + cr_date_month;
            }

            let cr_date_year = cr_date.getUTCFullYear();

            let cr_date_day = cr_date.getUTCDate();

            if(cr_date_day <= 9) {
                cr_date_day = "0" + cr_date_day;
            }

            cr_date_str = cr_date_year + "-" + cr_date_month + "-" + cr_date_day;

            console.log("Current Date: " + cr_date_str);

            cr_date_time_str = cr_date_time_hours + ":" + cr_date_time_minutes;

            console.log("Current Date Time: " + cr_date_time_str);

            //clearFunctions(live_games_check_inv_id);

            console.log("Result Name: (outside) " + result.name);
            console.log("Date String: (outside) " + cr_date_str);
            // next make an api call get all games by a date
                // if empty don't start an interval
                // otherwise check if time is greater than or equal to current time
                // also check if the game has a finished status
            api.getGameByDateForTeam(result.name, cr_date_str).then(result_2 => {
                console.log("Date Result: " + result_2);
                if(result) {
                    console.log("We have a game!");

                    console.log("Result Time: " + result_2.time );
                    console.log("CR Time: " + cr_date_time_str);
                    // check if time of game is greater than or equal to the current time
                    if(cr_date_time_str > result_2.time || cr_date_time_str == result_2.time) {
                        console.log("The game has passed or is ongoing");
                        // next check that the game is not finished
                        console.log("Result Status: " + result_2.status);
                        if(result_2.status != "FT") {
                            // initialize getLiveScore to trigger every minute (for now a second)
                            if(live_game_id == null) {
                                setLiveGameId(result_2.id);
                                // this line is probably not necessary
                                initializeLiveGame();
                                console.log("Live Game ID: (After Setting) " + live_game_id);
                                console.log("Live Game Object: (After Setting) " + live_game);
                                // calls getLiveGames every 30 seconds
                                live_games_inv_id = setInterval(getLiveGames, 1000 * 30, result, result_2);
                            }
                        }
                    }
                }
            }).catch(err => {
                console.log("Error when trying to get a game for a team by date");
            });
        }).catch(err => {
            console.log("Could not find team with id " + id );
        });

        console.log("Id of Live Games: " + live_games_inv_id);

        // comment this out later
        //clearFunctions(live_games_check_inv_id);
    }

    function clearFunctions(intervalId) {
        // clear intervals by id
        clearInterval(intervalId);

        if(intervalId == live_games_check_inv_id) {
            live_games_check_inv_id = null;
        }

        else if(intervalId == live_games_inv_id) {
            live_games_inv_id = null;
        }

        // I know these are null which is what I want
        // console.log("1: " + live_games_check_inv_id);
        // console.log("2: " + live_games_inv_id);
    }

    function getLiveGames(team, game) {
        // keep getting updates for live games
        // should update html on page as well
        console.log("We are in live games");
        console.log("Live Interval ID (in get live games): " + live_games_inv_id);
        console.log("Live Game ID: (in get live games)" + live_game_id);
        console.log("Live Game Object: (in get live games) " + live_game);
        console.log("Team Name: (in get live games) " + team.name );
        console.log("Game Id: (in get live games) " + game.id);

        api.getLiveGames(team.league, game.date).then(result => {
            console.log("Result: " + result);
            let game_obj;
            console.log("ID of game: " + live_game_id);

            for(let i = 0; i < result.response.length; i++) {
                if(result.response[i].teams.away["name"] == team.name || result.response[i].teams["home"] == team.name) {
                    game_obj = result.response[i];
                    break;
                }
            }

            // NOTE THIS RETURNS THE ENTIRE RESPONSE OBJECT

            console.log("Game: " + game_obj );

            if(game_obj == null) {
                // pass live game to update db function (call once)
                updateGameInDatabase(live_game);
                // set live game id to null
                setLiveGameId(null);
                // set live game to be null
                setLiveGame(null);
                // end the interval
                clearFunctions(live_games_inv_id);
            }

            else {
                console.log("Found Game: " + game_obj);

                // parse game information to update html with current score for away and home team
                // update the live_game object

                // check team.league to figure out what data we need to pull from external api
                if(team.league == "NFL") {
                    //
                    let upd = {};
                    upd.league = team.league;
                    upd.id = game.id;
                    upd.time = game.time;
                    // this is the current time in a live game (in a quarter for example => Q4: time == 14:32)
                    upd.timer = game_obj.game.status["timer"];
                    upd.timestamp = game.timestamp;
                    upd.stage = game_obj.game["stage"];
                    // for live games this will be quarter for nfl
                    upd.status = game_obj.game.status["short"];
                    upd.week = game.week;
                    upd.current_home_team_logo = game_obj.teams.home["logo"];
                    upd.current_home_team_name = game_obj.teams.home["name"];
                    upd.current_away_team_logo = game_obj.teams.away["logo"];
                    upd.current_away_team_name = game_obj.teams.away["name"];
                    upd.current_home_score = game_obj.scores.home["total"];
                    upd.current_away_score = game_obj.score.away["total"];
                    updateLiveGame(upd);
                }

                else if(team.league == "NBA") {
                    //
                    let upd = {};
                    upd.league = team.league;
                    upd.id = game.id;
                    upd.time = game.time;
                    // this is the current time in a live game (in a quarter for example => Q4: time == 14:32)
                    upd.timer = game_obj.status["timer"];
                    upd.timestamp = game.timestamp;
                    upd.stage = "";
                    // for live games this will be quarter for nfl
                    upd.status = game_obj.status["short"];
                    upd.week = game.week;
                    upd.current_home_team_logo = game_obj.teams.home["logo"];
                    upd.current_home_team_name = game_obj.teams.home["name"];
                    upd.current_away_team_logo = game_obj.teams.away["logo"];
                    upd.current_away_team_name = game_obj.teams.away["name"];
                    upd.current_home_score = game_obj.scores.home["total"];
                    upd.current_away_score = game_obj.score.away["total"];
                    updateLiveGame(upd);
                }

                else if(team.league == "MLB") {
                    //
                    //
                    let upd = {};
                    upd.league = team.league;
                    upd.id = game.id;
                    upd.time = game.time;
                    // this is the current time in a live game (in a quarter for example => Q4: time == 14:32)

                    upd.timer = "";
                    upd.timestamp = game.timestamp;
                    upd.stage = "";
                    // for live games this will be quarter for nfl
                    upd.status = game_obj.status["short"];
                    upd.week = game_obj["week"];
                    upd.current_home_team_logo = game_obj.teams.home["logo"];
                    upd.current_home_team_name = game_obj.teams.home["name"];
                    upd.current_away_team_logo = game_obj.teams.away["logo"];
                    upd.current_away_team_name = game_obj.teams.away["name"];
                    upd.current_home_score = game_obj.scores.home["total"];
                    upd.current_away_score = game_obj.score.away["total"];
                    updateLiveGame(upd);
                }

                else if(team.league == "MLS") {
                    //
                    //
                    let upd = {};
                    upd.league = team.league;
                    upd.id = game.id;
                    upd.time = game.time;
                    // this is the current time in a live game (in a quarter for example => Q4: time == 14:32)
                    upd.timer = game_obj.fixture.status["elapsed"];
                    upd.timestamp = game.timestamp;
                    upd.stage = "";
                    // for live games this will be quarter for nfl
                    upd.status = game_obj.fixture.status["short"];
                    upd.week = game.week;
                    upd.current_home_team_logo = game_obj.teams.home["logo"];
                    upd.current_home_team_name = game_obj.teams.home["name"];
                    upd.current_away_team_logo = game_obj.teams.away["logo"];
                    upd.current_away_team_name = game_obj.teams.away["name"];
                    upd.current_home_score = game_obj.goals["home"];
                    upd.current_away_score = game_obj.goals["away"];
                    updateLiveGame(upd);
                }
            }
        }).catch(err => {
            console.log("Error getting live games");
        })
    }

    function updateGameInDatabase(game) {
        // updates a game in the database when it is no longer live
        api.updateGames(game).then(result => {
        }).catch(err => {
            console.log("Game could not be updated");
        });

        // clear the interval so we stop checking for the previously live game
        clearFunctions(live_games_inv_id);

        // update schedule (db and html)
        updateSchedule();
    }

    function setLiveGameId(id) {
        live_game_id = id;
    }

    function initializeLiveGame() {
        live_game.league = null;
        live_game.id = null;
        live_game.date = null;
        live_game.time = null;
        live_game.timer = null;
        live_game.timestamp = null;
        live_game.stage = null;
        live_game.status = null;
        live_game.week = null;
        live_game.current_home_team_logo = null;
        live_game.current_away_team_logo = null;
        live_game.current_home_team_name = null;
        live_game.current_away_team_name = null;
        live_game.current_home_score = null;
        live_game.current_away_score = null;
    }

    function updateLiveGame(game_obj) {
        live_game = game_obj;
    }

    function updateSchedule() {
        // call api to get all games for a team

        // update html elements
    }

    createAFCNorth();
    createAFCEast();
    createAFCSouth();
    createAFCWest();
  
    createNFCNorth();
    createNFCEast();
    createNFCSouth();
   createNFCWest();
  
  function createAFCNorth() {
    const AFC_North = document.getElementById("AFC_North");
    const browns = createTeamHtml("Cleveland Browns");
    const ravens = createTeamHtml("Baltimore Ravens");
    const bengals = createTeamHtml("Cincinnati Bengals");
    const steelers = createTeamHtml("Pittsburgh Steelers");
    AFC_North.appendChild(browns);
    AFC_North.appendChild(ravens);
    AFC_North.appendChild(bengals);
    AFC_North.appendChild(steelers);
  }
  
  function createAFCEast() {
    const AFC_East = document.getElementById("AFC_East");
    const jets = createTeamHtml("New York Jets");
    const dolphins = createTeamHtml("Miami Dolphins");
    const patriots = createTeamHtml("New England Patriots");
    const bills = createTeamHtml("Buffalo Bills");
    AFC_East.appendChild(jets);
    AFC_East.appendChild(dolphins);
    AFC_East.appendChild(patriots);
    AFC_East.appendChild(bills);
  }
  
  function createAFCSouth() {
    const AFC_South = document.getElementById("AFC_South");
    const jags = createTeamHtml("Jacksonville Jaguars");
    const titans = createTeamHtml("Tennessee Titans");
    const colts = createTeamHtml("Indianapolis Colts");
    const texans = createTeamHtml("Houston Texans");
    AFC_South.appendChild(jags);
    AFC_South.appendChild(titans);
    AFC_South.appendChild(colts);
    AFC_South.appendChild(texans);
  }
  
  function createAFCWest() {
    const AFC_West = document.getElementById("AFC_West");
    const raiders = createTeamHtml("Las Vegas Raiders");
    const chiefs = createTeamHtml("Kansas City Chiefs");
    const broncos = createTeamHtml("Denver Broncos");
    const chargers = createTeamHtml("Los Angeles Chargers");
    AFC_West.appendChild(raiders);
    AFC_West.appendChild(chiefs);
    AFC_West.appendChild(broncos);
    AFC_West.appendChild(chargers);
  }
  
  function createNFCNorth() {
    const NFC_North = document.getElementById("NFC_North");
    const packers = createTeamHtml("Green Bay Packers");
    const lions = createTeamHtml("Detroit Lions");
    const vikings = createTeamHtml("Minnesota Vikings");
    const bears = createTeamHtml("Chicago Bears");
    NFC_North.appendChild(packers);
    NFC_North.appendChild(lions);
    NFC_North.appendChild(vikings);
    NFC_North.appendChild(bears);
  }
  
  function createNFCEast() {
    const NFC_East = document.getElementById("NFC_East");
    const cowboys = createTeamHtml("Dallas Cowboys");
    const commanders = createTeamHtml("Washington Commanders");
    const eagles = createTeamHtml("Philadelphia Eagles");
    const giants = createTeamHtml("New York Giants");
    NFC_East.appendChild(cowboys);
    NFC_East.appendChild(commanders);
    NFC_East.appendChild(eagles);
    NFC_East.appendChild(giants);
  }
  
  function createNFCSouth() {
    const NFC_South = document.getElementById("NFC_South");
    const falcons = createTeamHtml("Atlanta Falcons");
    const buccs = createTeamHtml("Tampa Bay Buccaneers");
    const saints = createTeamHtml("New Orleans Saints");
    const panthers = createTeamHtml("Carolina Panthers");
    NFC_South.appendChild(falcons);
    NFC_South.appendChild(buccs);
    NFC_South.appendChild(saints);
    NFC_South.appendChild(panthers);
  }
  
  function createNFCWest() {
    const NFC_West = document.getElementById("NFC_West");
    const rams = createTeamHtml("Los Angeles Rams");
    const fortyniners = createTeamHtml("San Francisco 49ers");
    const cardinals = createTeamHtml("Arizona Cardinals");
    const seahawks = createTeamHtml("Seattle Seahawks");
    NFC_West.appendChild(rams);
    NFC_West.appendChild(fortyniners);
    NFC_West.appendChild(cardinals);
    NFC_West.appendChild(seahawks);
  }
  
  function createTeamHtml(teamName) {
    const item = document.createElement("li");
    api.getTeamByName(teamName).then((team) => {
      const teamLink = document.createElement("a");
      teamLink.href = "team?id=" + team.id;
      teamLink.innerHTML = teamName;
      item.appendChild(teamLink);
    });
    return item;
  }
});

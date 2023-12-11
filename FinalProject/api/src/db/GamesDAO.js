const db = require("./DBConnection");
const Game = require("./models/Game");

function getGamesForTeamWithID(teamId) {
    return db
    .query("SELECT * FROM games WHERE home_team_id=? OR away_team_id=?", [teamId, teamId])
    .then(({results}) => {
        return results.map(game => new Game(game));
    });
}

function getGamesForTeamWithName(teamName) {
    return db
    .query("SELECT * FROM games WHERE name=?", [teamName])
    .then(({results}) => {
        return results.map(game => new Game(game));
    });
}

// gets a schedule for a team with a teamName that is ordered by date
function getScheduleInOrder(teamName) {
    return db
    .query("SELECT * FROM games WHERE home_team_name=? OR away_team_name=? ORDER BY date ASC" [teamName, teamName])
    .then(({results}) => {
        return results.map(game => new Game(game));
    });
}

// useful for checking if we have a game on a current date
// so we can then check it's information to call live scoring external api
function getGameByDateForTeam(teamName, date) {
    return db
    .query("SELECT * FROM games WHERE date=? AND (home_team_name=? OR away_team_name=?)", [date, teamName, teamName])
    .then(({results}) => {
        console.log("Results IN API: " + results);

        const game = new Game(results[0]);

        console.log("Game To JSON: " + game.toJSON());

        if(game) {
            return game;
        }

        else {
            throw new Error("No such game with date " + date + " and team name: " + teamName);
        }
    });
}

function getAllGamesByWeekForALeague(leagueName, stage, weekNumber) {
    return db
    .query("SELECT * FROM games WHERE league=? AND stage=? AND week=?", [leagueName, stage, weekNumber])
    .then(({results}) => {
        return results.map(game => new Game(game));
    });
}

function addGame(game) {
    return db
    .query("INSERT INTO games (league, date, time, timestamp, stage, week, home_team_name, away_team_name, status, final_home_score, final_away_score) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [game.league, game.date, game.time, game.timestamp, game.stage, game.week, game.home_team_name, game.away_team_name, game.status, game.final_home_score, game.final_away_score])
    .then(({results}) => {
        return;
    });
}

function updateGame(id, status, final_home_score, final_away_score) {
    return db
    .query("UPDATE games SET status=? AND final_home_score=? AND final_away_score=? WHERE id=?", [status, final_home_score, final_away_score, id])
    .then(({results}) => {
        console.log("Result of update to game: ", results[0]);
        return;
    });
}

function getAllGames() {
    return db
    .query("SELECT * FROM games")
    .then(({results}) => {
        return results.map(game => new Game(game));
    })
}

module.exports =  {
    getGamesForTeamWithID: getGamesForTeamWithID,
    getGamesForTeamWithName: getGamesForTeamWithName,
    getAllGamesByWeekForALeague: getAllGamesByWeekForALeague,
    addGame: addGame,
    updateGame: updateGame,
    getAllGames: getAllGames,
    getScheduleInOrder: getScheduleInOrder,
    getGameByDateForTeam: getGameByDateForTeam,

};
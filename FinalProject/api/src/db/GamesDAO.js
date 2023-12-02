const db = require("./DBConnection");
const Game = require("./models/Game");

function getGamesForTeamWithID(teamId) {
    db
    .query("SELECT * FROM games WHERE home_team_id=? OR away_team_id=?", [teamId, teamId])
    .then(({results}) => {
        return results.map(game => new Game(game));
    });
}

function getGamesForTeamWithName(teamName) {
    db
    .query("SELECT * FROM games WHERE name=?", [teamName])
    .then(({results}) => {
        return results.map(game => new Game(game));
    });
}

function getAllGamesByWeekForALeague(leagueName, weekNumber) {
    db
    .query("SELECT * FROM games WHERE league=? AND week=?", [leagueName, weekNumber])
    .then(({results}) => {
        return results.map(game => new Game(game));
    });
}

function addGame(game) {
    db
    .query("INSERT INTO games (id, date, timestamp, week, home_team_id, away_team_id, status, final_home_score, final_away_score VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [game.id, game.date, game.timestamp, game.week, game.home_team_id, game.away_team_id, game.status, game.final_home_score, game.final_away_score])
    .then(({results}) => {
        console.log("Insert =" + results[0]);
        return;
    });
}

function updateGame(id, status, final_home_score, final_away_score) {
    db
    .query("UPDATE games SET status=? AND final_home_score=? AND final_away_score=? WHERE id=?", [status, final_home_score, final_away_score, id])
    .then(({results}) => {
        console.log("Result of update to game: ", results[0]);
        return;
    });
}

function getAllGames() {
    db
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
    getAllGames: getAllGames
};
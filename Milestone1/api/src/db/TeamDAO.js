// data for schedules
const scheduleData = require("./data/schedule.json");

// data for live scoring
const liveScoreData = require("./data/liveScore.json");

// data for team information

const nflData = require("./data/nflTeams.json");

const nbaData = require("./data/nbaTeams.json");

const mlbData = require("./data/mlbTeams.json");

const mlsData = require("./data/mlsTeams.json");

function getScheduleForLeague(leagueId) {
  // Retrieve and filter schedule data for the specified league
  return scheduleData.filter((item) => item.leagueId === leagueId);
}

function getLiveScoreForGame(gameId) {
  // Retrieve live scoring data for the specified game
  return liveScoreData.find((item) => item.gameId === gameId);
}

function getNflTeamInfo(teamId) {
  // Retrieve team information for the specified team
  return nflData.find((item) => item.teamId === teamId);
}

function getNbaTeamInfo(teamId) {
  // Retrieve team information for the specified team
  return nbaData.find((item) => item.teamId === teamId);
}

function getMlbTeamInfo(teamId) {
  // Retrieve team information for the specified team
  return mlbData.find((item) => item.teamId === teamId);
}

function getMlsTeamInfo(teamId) {
  // Retrieve team information for the specified team
  return mlsData.find((item) => item.teamId === teamId);
}

module.exports = {
  getScheduleForLeague,
  getLiveScoreForGame,
  getNflTeamInfo,
  getNbaTeamInfo,
  getMlbTeamInfo,
  getMlsTeamInfo,
};

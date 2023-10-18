// data for schedules
const scheduleData = require("./data/schedule.json");

// data for live scoring
const liveScoreData = require("./data/liveScore.json");

// data for team information
const teamData = require("./data/teams.json");

function getScheduleForLeague(leagueId) {
  // Retrieve and filter schedule data for the specified league
  return scheduleData.filter((item) => item.leagueId === leagueId);
}

function getLiveScoreForGame(gameId) {
  // Retrieve live scoring data for the specified game
  return liveScoreData.find((item) => item.gameId === gameId);
}

function getTeamInfo(teamId) {
  // Retrieve team information for the specified team
  return teamData.find((item) => item.teamId === teamId);
}

module.exports = {
  getScheduleForLeague,
  getLiveScoreForGame,
  getTeamInfo,
};
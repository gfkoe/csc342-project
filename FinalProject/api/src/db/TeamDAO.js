const db = require("./DBConnection");
const Team = require('./models/Team');

function getTeamByName(teamName) {
  return db
  .query("SELECT * FROM teams WHERE name=?", [teamName])
  .then(({results}) => {
    const team = new Team(results[0]);
    console.log("Team Name = " + team.name);
    if(team) {
      return team;
    }

    else {
      throw new Error("No such team by name " + teamName);
    }
  });
}

function getTeamByID(teamId) {
  return db
  .query("SELECT * FROM teams WHERE id=?", [teamId])
  .then(({results}) => {
    const team = new Team(results[0]);

    if(team) {
      return team;
    }

    else {
      throw new Error("No such team with id " + teamId);
    }
  });
}

function addTeamLogo(teamName, logo) {
  return db
  .query("UPDATE teams SET logo=? WHERE name=?", [logo, teamName])
  .then(({results}) => {
    return;
  });
}

module.exports = {
  getTeamByName: getTeamByName,
  getTeamByID: getTeamByID,
  addTeamLogo: addTeamLogo
};

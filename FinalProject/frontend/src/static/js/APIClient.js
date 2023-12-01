import HTTPClient from "./HTTPClient.js";
const API_BASE = "api";

export default {
  getCurrentUser: () => {
    return HTTPClient.get(API_BASE + "/users/current");
  },
  getTeam: (teamId) => {
    return HTTPClient.get(API_BASE + `/leagues/${leagueId}` + "/schedule");
  },

  getUser: (userId) => {
    return HTTPClient.get(API_BASE + `/users/${userId}`);
  },

  logIn: (username, password) => {
    let data = {
      username: username,
      password: password,
    };
    return HTTPClient.post(API_BASE + "/users/login", data);
  },

  logOut: () => {
    return HTTPClient.post(API_BASE + "/users/logout", {});
  },

  getTeamByName: (leagueName, teamName) => {
    return HTTPClient.get(API_BASE + `/teams/${leagueName}/${teamName}`);
  }
};

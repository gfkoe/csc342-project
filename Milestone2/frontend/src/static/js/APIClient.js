import HTTPClient from "./HTTPClient";
const API_BASE = "api";

export default {
  getCurrentUser: () => {
    return HTTPClient.get(API_BASE + "/users/current");
  },
  getTeam: (teamId) => {
    return HTTPClient.get(API_BASE + `/leagues/${leagueId}` + "/schedule");
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
};

import HTTPClient from "./HTTPClient.js";
const API_BASE = "api";

export default {
  getCurrentUser: () => {
    return HTTPClient.get(API_BASE + "/users/current");
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

  initialize: () => {
    return HTTPClient.post(API_BASE + "/games/intialize", {});
  },

  getGameForTeamById: (teamId) => {
    return HTTPClient.get(API_BASE + `/games/team/${teamId}`);
  },

  getGamesByWeekNumber: (weekNumber) => {
    return HTTPClient.get(API_BASE + `/games/${weekNumber}`);
  },

  updateGames: (game) => {
    return HTTPClient.put(API_BASE + "/games/update", game);
  },

  getTeamByName: (name) => {
    return HTTPClient.get(API_BASE + `/teams/${name}`);
  },

  getTeamById: (id) => {
    return HTTPClient.get(API_BASE + `/teams/${id}`);
  },

  addTeamLogo: (name, logo) => {
    return HTTPClient.put(API_BASE + `/teams/logo/${name}`, logo);
  },

  getAllGames: () => {
    return HTTPClient.get(API_BASE + "/games/all");
  }
};

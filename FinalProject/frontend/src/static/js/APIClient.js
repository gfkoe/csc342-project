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

  createAccount: (first_name, last_name, username, password) => {
    let data = {
      first: first_name,
      last: last_name,
      username: username,
      password: password,
    };
    // console.log(data);
    return HTTPClient.post(API_BASE + "/users/create", data);
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
    return HTTPClient.get(API_BASE + `/teams/names/${name}`);
  },

  getTeamById: (id) => {
    return HTTPClient.get(API_BASE + `/teams/${id}`);
  },

  addTeamLogo: (name, logo) => {
    return HTTPClient.put(API_BASE + `/teams/logo/${name}`, logo);
  },

  getAllGames: () => {
    return HTTPClient.get(API_BASE + "/games/all");
  },
};

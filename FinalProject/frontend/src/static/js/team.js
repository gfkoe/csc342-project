import api from "./APIClient.js";

document.addEventListener("DOMContentLoaded", (e) => {
  let settings_button = document.querySelector("#settingsBtn");
  let signIn_button = document.querySelector("#signIn");
  let home_button = document.querySelector("#home");

  settings_button.addEventListener("click", (e) => {
    document.location = "/settings";
  });

  signIn_button.addEventListener("click", (e) => {
    document.location = "/login";
  });

  home_button.addEventListener("click", (e) => {
    document.location = "/";
  });
  const query = window.location.search.substring(1);
  const val = query.split("=");
  const id = val[1];

  fillLeagueName(id);
  fillLeagueInfo(id);
});

function fillLeagueName(id) {
  api.getTeamById(id).then((team) => {
    const league = team.league;
    console.log(league);
    const teamHeader = document.getElementById("teamHeader");
    teamHeader.innerHTML = league + " - " + team.name;
  });
}

function fillLeagueInfo(id) {
  api.getTeamById(id).then((team) => {
    const conference = team.conference;
    const division = team.division;
    const abbrev = team.abbreviation;
    const logo = team.logo;
    const info = document.getElementById("info");
    const logoTag = document.getElementById("logo");

    if (division != null) {
      info.innerHTML = conference + " " + division + " " + abbrev;
    } else {
      info.innerHTML = conference + " " + abbrev;
    }

    logoTag.src = logo;
  });
}

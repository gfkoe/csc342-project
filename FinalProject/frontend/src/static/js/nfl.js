import api from "./APIClient.js";

document.addEventListener("DOMContentLoaded", (e) => {
  let settings_button = document.querySelector("#settingsBtn");
  let signIn_button = document.querySelector("#signInBtn");
  let home_button = document.querySelector("#home");
  let profile_picture = document.querySelector("#profilePic");
  profile_picture.addEventListener("click", (e) => {
    document.location = "/account";
  });
  settings_button.addEventListener("click", (e) => {
    document.location = "/settings";
  });

  signIn_button.addEventListener("click", (e) => {
    document.location = "/login";
  });

  home_button.addEventListener("click", (e) => {
    api
      .initialize()
      .then((response) => {})
      .catch((err) => {
        console.log(err);
      });
    document.location = "/";
  });
  const AFC_North = document.getElementById("AFC_North");
  const browns = createTeamHtml("Cleveland Browns");
  const ravens = createTeamHtml("Baltimore Ravens");
  const bengals = createTeamHtml("Cincinnati Bengals");
  const steelers = createTeamHtml("Pittsburgh Steelers");
  AFC_North.appendChild(browns);
  AFC_North.appendChild(ravens);
  AFC_North.appendChild(bengals);
  AFC_North.appendChild(steelers);
});

function createTeamHtml(teamName) {
  const item = document.createElement("li");
  api.getTeamByName(teamName).then((team) => {
    const teamLink = document.createElement("a");
    teamLink.href = "team?id=" + team.id;
    teamLink.innerHTML = teamName;
    item.appendChild(teamLink);
  });
  return item;
}

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
    document.location = "/";
  });

  createEastern();
  createWestern();
});

function createEastern() {
  const east = document.getElementById("east");
  const atlanta = createTeamHtml("Atlanta United FC");
  const charlotte = createTeamHtml("Charlotte FC");
  const cfire = createTeamHtml("Chicago Fire FC");
  const cincinatti = createTeamHtml("FC Cincinnati");
  const columbus = createTeamHtml("Columbus Crew");
  const dcunited = createTeamHtml("D.C. United");
  const intermiami = createTeamHtml("Inter Miami CF");
  const montreal = createTeamHtml("CF Montréal");
  const orlando = createTeamHtml("Orlando City SC");
  const revolution = createTeamHtml("New England Revolution");
  const nyfc = createTeamHtml("New York City FC");
  const redbulls = createTeamHtml("New York Red Bulls");
  const louisville = createTeamHtml("St. Louis City SC");

  east.appendChild(atlanta);
  east.appendChild(charlotte);
  east.appendChild(cfire);
  east.appendChild(cincinatti);
  east.appendChild(columbus);
  east.appendChild(dcunited);
  east.appendChild(intermiami);
  east.appendChild(montreal);
  east.appendChild(orlando);
  east.appendChild(revolution);
  east.appendChild(nyfc);
  east.appendChild(redbulls);
  east.appendChild(louisville);
}

function createWestern() {
  const west = document.getElementById("west");
  const austin = createTeamHtml("Austin FC");
  const rapids = createTeamHtml("Colorado Rapids");
  const dallas = createTeamHtml("FC Dallas");
  const houston = createTeamHtml("Houston Dynamo FC");
  const kansas = createTeamHtml("Sporting Kansas City");
  const lagalaxy = createTeamHtml("LA Galaxy");
  const lafc = createTeamHtml("Los Angeles FC");
  const minnesota = createTeamHtml("Minnesota United FC");
  const nashville = createTeamHtml("Nashville SC");
  const timbers = createTeamHtml("Portland Timbers");
  const realSalt = createTeamHtml("Real Salt Lake");
  const earthquakes = createTeamHtml("San Jose Earthquakes");
  const sounders = createTeamHtml("Seattle Sounders FC");
  const whitecaps = createTeamHtml("Vancouver Whitecaps");

  west.appendChild(austin);
  west.appendChild(rapids);
  west.appendChild(dallas);
  west.appendChild(houston);
  west.appendChild(kansas);
  west.appendChild(lagalaxy);
  west.appendChild(lafc);
  west.appendChild(minnesota);
  west.appendChild(nashville);
  west.appendChild(timbers);
  west.appendChild(realSalt);
  west.appendChild(earthquakes);
  west.appendChild(sounders);
  west.appendChild(whitecaps);
}

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

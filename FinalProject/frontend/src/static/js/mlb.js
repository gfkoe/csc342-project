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

  createAlCentral();
  createAlEast();
  createAlWest();

  createNlCentral();
  createNlEast();
  createNlWest();
});

function createAlCentral() {
  const alcentral = document.getElementById("alcentral");
  const tigers = createTeamHtml("Detroit Tigers");
  const royals = createTeamHtml("Kansas City Royals");
  const twins = createTeamHtml("Minnesota Twins");
  const wsox = createTeamHtml("Chicago White Sox");
  const guardians = createTeamHtml("Cleveland Guardians");
  alcentral.appendChild(tigers);
  alcentral.appendChild(royals);
  alcentral.appendChild(twins);
  alcentral.appendChild(wsox);
  alcentral.appendChild(guardians);
}
function createAlEast() {
  const aleast = document.getElementById("aleast");
  const rays = createTeamHtml("Tampa Bay Rays");
  const bluejays = createTeamHtml("Toronto Blue Jays");
  const yankees = createTeamHtml("New York Yankees");
  const orioles = createTeamHtml("Baltimore Orioles");
  const rsox = createTeamHtml("Boston Red Sox");
  aleast.appendChild(rays);
  aleast.appendChild(bluejays);
  aleast.appendChild(yankees);
  aleast.appendChild(orioles);
  aleast.appendChild(rsox);
}
function createAlWest() {
  const alwest = document.getElementById("alwest");
  const astros = createTeamHtml("Houston Astros");
  const rangers = createTeamHtml("Texas Rangers");
  const angels = createTeamHtml("Los Angeles Angels");
  const as = createTeamHtml("Oakland Athletics");
  const mariners = createTeamHtml("Seattle Mariners");
  alwest.appendChild(astros);
  alwest.appendChild(rangers);
  alwest.appendChild(angels);
  alwest.appendChild(as);
  alwest.appendChild(mariners);
}

function createNlCentral() {
  const nlcentral = document.getElementById("nlcentral");
  const cards = createTeamHtml("St. Louis Cardinals");
  const brewers = createTeamHtml("Milwaukee Brewers");
  const cubs = createTeamHtml("Chicago Cubs");
  const pirates = createTeamHtml("Pittsburgh Pirates");
  const reds = createTeamHtml("Cincinnati Reds");
  nlcentral.appendChild(cards);
  nlcentral.appendChild(brewers);
  nlcentral.appendChild(cubs);
  nlcentral.appendChild(pirates);
  nlcentral.appendChild(reds);
}
function createNlEast() {
  const nleast = document.getElementById("nleast");
  const nats = createTeamHtml("Washington Nationals");
  const marlins = createTeamHtml("Miami Marlins");
  const braves = createTeamHtml("Atlanta Braves");
  const mets = createTeamHtml("New York Mets");
  const phillies = createTeamHtml("Philadelphia Phillies");
  nleast.appendChild(nats);
  nleast.appendChild(marlins);
  nleast.appendChild(braves);
  nleast.appendChild(mets);
  nleast.appendChild(phillies);
}
function createNlWest() {
  const nlwest = document.getElementById("nlwest");
  const dodgers = createTeamHtml("Los Angeles Dodgers");
  const dbacks = createTeamHtml("Arizona Diamondbacks");
  const padres = createTeamHtml("San Diego Padres");
  const giants = createTeamHtml("San Francisco Giants");
  const rockies = createTeamHtml("Colorado Rockies");
  nlwest.appendChild(dodgers);
  nlwest.appendChild(dbacks);
  nlwest.appendChild(padres);
  nlwest.appendChild(giants);
  nlwest.appendChild(rockies);
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

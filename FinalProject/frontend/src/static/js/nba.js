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

  createAtlantic();
  createCentral();
  createSoutheast();

  createNorthwest();
  createPacific();
  createSouthwest();
});

function createAtlantic() {
  const atlantic = document.getElementById("atlantic");
  const celtics = createTeamHtml("Boston Celtics");
  const nets = createTeamHtml("Brooklyn Nets");
  const knicks = createTeamHtml("New York Knicks");
  const sixers = createTeamHtml("Philadelphia 76ers");
  const raptors = createTeamHtml("Toronto Raptors");
  atlantic.appendChild(celtics);
  atlantic.appendChild(nets);
  atlantic.appendChild(knicks);
  atlantic.appendChild(sixers);
  atlantic.appendChild(raptors);
}

function createCentral() {
  const central = document.getElementById("central");
  const bulls = createTeamHtml("Chicago Bulls");
  const cavaliers = createTeamHtml("Cleveland Cavaliers");
  const pistons = createTeamHtml("Detroit Pistons");
  const pacers = createTeamHtml("Indiana Pacers");
  const bucks = createTeamHtml("Milwaukee Bucks");

  central.appendChild(bulls);
  central.appendChild(cavaliers);
  central.appendChild(pistons);
  central.appendChild(pacers);
  central.appendChild(bucks);
}

function createSoutheast() {
  const southeast = document.getElementById("southeast");
  const hawks = createTeamHtml("Atlanta Hawks");
  const hornets = createTeamHtml("Charlotte Hornets");
  const heat = createTeamHtml("Miami Heat");
  const magic = createTeamHtml("Orlando Magic");
  const wizards = createTeamHtml("Washington Wizards");

  southeast.appendChild(hawks);
  southeast.appendChild(hornets);
  southeast.appendChild(heat);
  southeast.appendChild(magic);
  southeast.appendChild(wizards);
}

function createNorthwest() {
  const northwest = document.getElementById("northwest");
  const nuggs = createTeamHtml("Denver Nuggets");
  const twolves = createTeamHtml("Minnesota Timberwolves");
  const thunder = createTeamHtml("Oklahoma City Thunder");
  const blazers = createTeamHtml("Portland Trail Blazers");
  const jazz = createTeamHtml("Utah Jazz");

  northwest.appendChild(nuggs);
  northwest.appendChild(twolves);
  northwest.appendChild(thunder);
  northwest.appendChild(blazers);
  northwest.appendChild(jazz);
}

function createPacific() {
  const pacific = document.getElementById("pacific");
  const warriors = createTeamHtml("Golden State Warriors");
  const clippers = createTeamHtml("Los Angeles Clippers");
  const lakers = createTeamHtml("Los Angeles Lakers");
  const suns = createTeamHtml("Phoenix Suns");
  const kings = createTeamHtml("Sacramento Kings");

  pacific.appendChild(warriors);
  pacific.appendChild(clippers);
  pacific.appendChild(lakers);
  pacific.appendChild(suns);
  pacific.appendChild(kings);
}

function createSouthwest() {
  const southwest = document.getElementById("southwest");
  const mavs = createTeamHtml("Dallas Mavericks");
  const rockets = createTeamHtml("Houston Rockets");
  const grizzlies = createTeamHtml("Memphis Grizzlies");
  const pelicans = createTeamHtml("New Orleans Pelicans");
  const spurs = createTeamHtml("San Antonio Spurs");

  southwest.appendChild(mavs);
  southwest.appendChild(rockets);
  southwest.appendChild(grizzlies);
  southwest.appendChild(pelicans);
  southwest.appendChild(spurs);
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

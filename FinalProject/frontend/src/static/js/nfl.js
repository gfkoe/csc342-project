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

  createAFCNorth();
  createAFCEast();
  createAFCSouth();
  createAFCWest();

  createNFCNorth();
  createNFCEast();
  createNFCSouth();
  createNFCWest();
});

function createAFCNorth() {
  const AFC_North = document.getElementById("AFC_North");
  const browns = createTeamHtml("Cleveland Browns");
  const ravens = createTeamHtml("Baltimore Ravens");
  const bengals = createTeamHtml("Cincinnati Bengals");
  const steelers = createTeamHtml("Pittsburgh Steelers");
  AFC_North.appendChild(browns);
  AFC_North.appendChild(ravens);
  AFC_North.appendChild(bengals);
  AFC_North.appendChild(steelers);
}

function createAFCEast() {
  const AFC_East = document.getElementById("AFC_East");
  const jets = createTeamHtml("NY Jets");
  const dolphins = createTeamHtml("Miami Dolphins");
  const patriots = createTeamHtml("New England Patriots");
  const bills = createTeamHtml("Buffalo Bills");
  AFC_East.appendChild(jets);
  AFC_East.appendChild(dolphins);
  AFC_East.appendChild(patriots);
  AFC_East.appendChild(bills);
}

function createAFCSouth() {
  const AFC_South = document.getElementById("AFC_South");
  const jags = createTeamHtml("Jacksonville Jaguars");
  const titans = createTeamHtml("Tennessee Titans");
  const colts = createTeamHtml("Indianapolis Colts");
  const texans = createTeamHtml("Houston Texans");
  AFC_South.appendChild(jags);
  AFC_South.appendChild(titans);
  AFC_South.appendChild(colts);
  AFC_South.appendChild(texans);
}

function createAFCWest() {
  const AFC_West = document.getElementById("AFC_West");
  const raiders = createTeamHtml("Las Vegas Raiders");
  const chiefs = createTeamHtml("Kansas City Chiefs");
  const broncos = createTeamHtml("Denver Broncos");
  const chargers = createTeamHtml("Los Angeles Chargers");
  AFC_West.appendChild(raiders);
  AFC_West.appendChild(chiefs);
  AFC_West.appendChild(broncos);
  AFC_West.appendChild(chargers);
}

function createNFCNorth() {
  const NFC_North = document.getElementById("NFC_North");
  const packers = createTeamHtml("Green Bay Packers");
  const lions = createTeamHtml("Detroit Lions");
  const vikings = createTeamHtml("Minnesota Vikings");
  const bears = createTeamHtml("Chicago Bears");
  NFC_North.appendChild(packers);
  NFC_North.appendChild(lions);
  NFC_North.appendChild(vikings);
  NFC_North.appendChild(bears);
}

function createNFCEast() {
  const NFC_East = document.getElementById("NFC_East");
  const cowboys = createTeamHtml("Dallas Cowboys");
  const commanders = createTeamHtml("Washington Commanders");
  const eagles = createTeamHtml("Philadelphia Eagles");
  const giants = createTeamHtml("NY Giants");
  NFC_East.appendChild(cowboys);
  NFC_East.appendChild(commanders);
  NFC_East.appendChild(eagles);
  NFC_East.appendChild(giants);
}

function createNFCSouth() {
  const NFC_South = document.getElementById("NFC_South");
  const falcons = createTeamHtml("Atlanta Falcons");
  const buccs = createTeamHtml("Tampa Bay Buccaneers");
  const saints = createTeamHtml("New Orleans Saints");
  const panthers = createTeamHtml("Carolina Panthers");
  NFC_South.appendChild(falcons);
  NFC_South.appendChild(buccs);
  NFC_South.appendChild(saints);
  NFC_South.appendChild(panthers);
}

function createNFCWest() {
  const NFC_West = document.getElementById("NFC_West");
  const rams = createTeamHtml("Los Angeles Rams");
  const fortyniners = createTeamHtml("San Francisco 49ers");
  const cardinals = createTeamHtml("Arizona Cardinals");
  const seahawks = createTeamHtml("Seattle Seahawks");
  NFC_West.appendChild(rams);
  NFC_West.appendChild(fortyniners);
  NFC_West.appendChild(cardinals);
  NFC_West.appendChild(seahawks);
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

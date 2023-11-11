import api from "./APIClient.js";

document.addEventListener("DOMContentLoaded", (e) => {
  let nfl_button = document.querySelector("#nfl");
  let nba_button = document.querySelector("#nba");
  let mlb_button = document.querySelector("#mlb");
  let mls_button = document.querySelector("#mls");

  let account_button = document.querySelector("#profilePic");

  account_button.addEventListener("click", (e) => {
    document.location = "/account";
  });

  nfl_button.addEventListener("click", (e) => {
    document.location = "/nfl";
  });

  nba_button.addEventListener("click", (e) => {
    document.location = "/nba";
  });

  mlb_button.addEventListener("click", (e) => {
    document.location = "/mlb";
  });

  mls_button.addEventListener("click", (e) => {
    document.location = "/mls";
  });
});

//TODO: WILL NEED TO UNCOMMENTED WHEN AUTHENTICATION WORKS

api
  .getCurrentUser()
  .then((user) => {
    updateUserBlock(user);
  })
  .catch((error) => {
    if (error.status === 401) {
      console.log("We are not logged in");
      document.location = "../login";
    } else {
      console.log(`${error.status}`, error);
    }
  });

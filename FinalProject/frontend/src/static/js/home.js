import api from "./APIClient.js";

document.addEventListener("DOMContentLoaded", (e) => {
  let nfl_button = document.querySelector("#nfl");
  let nba_button = document.querySelector("#nba");
  let mlb_button = document.querySelector("#mlb");
  let mls_button = document.querySelector("#mls");
  // let signIn_button = document.querySelector("#signIn");
  let settings_button = document.querySelector("#settingsBtn");
  let profile_picture = document.querySelector("#profilePic");

  // const query = window.location.search;
  // let parameters = new URLSearchParams(query);
  // let id = null;

  // try {
  //   id = parameters.get('id');
  // }catch(err){
  //   //
  // }

  // console.log(id);

  // if(id == null) {
  //   settings_button.disabled = true;

  //   let signIn_button = document.createElement('button');
  //   signIn_button.classList.add('signIn');
  //   signIn_button.innerHTML = "Sign In";

  //   signIn_button.addEventListener('click', (e) => {
  //     document.location = "login";
  //   });

  //   document.querySelector(".header").appendChild(signIn_button);
  // }

  // else {
  //     api.getCurrentUser().then(user => {
  //       let logout_button = document.createElement('button');
  //       logout_button.classList.add('signIn');
  //       logout_button.innerHTML = "log out";

  //       logout_button.addEventListener("click", (e) => {
  //         api.logOut().then(result => {
  //           // reload page?
  //           document.location = "./";
  //         });
  //       }).catch(err => {
  //       //
  //     });

  //     document.querySelector(".header").appendChild(logout_button);

  //     // set user profile picture as home page picture
  //     profile_picture.src = user.avatar;
  //   }).catch(err => {
  //     // if we don't have a user we don't need to access the settings page to pick a favorite team
  //     settings_button.disabled = true;
  //     //
  //   });
  // }

  profile_picture.addEventListener("click", (e) => {
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
    // updateUserBlock(user);
  })
  .catch((error) => {
    if (error.status === 401) {
      console.log("We are not logged in");
      document.location = "../login";
    } else {
      console.log(`${error.status}`, error);
    }
  });

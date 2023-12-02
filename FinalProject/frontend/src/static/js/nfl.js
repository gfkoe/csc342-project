import api from "./APIClient.js";

document.addEventListener('DOMContentLoaded', (e) => {
    let settings_button = document.querySelector("#settingsBtn");
    let signIn_button = document.querySelector("#signInBtn");
    let home_button = document.querySelector("#home");
    let profile_picture = document.querySelector("#profilePic");
    profile_picture.addEventListener("click", (e) => {
      document.location = "/account";
    });
    settings_button.addEventListener('click', (e) => {
        document.location = "/settings";
    });

    signIn_button.addEventListener('click', (e) => {
        document.location = "/login";
    });

    home_button.addEventListener('click', (e) => {
        api.initialize().then(response => {
        }).catch(err => {
            console.log(err);
        });
        document.location = "/";
    });
});
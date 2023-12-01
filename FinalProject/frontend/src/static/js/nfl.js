import api from "./APIClient.js";

document.addEventListener('DOMContentLoaded', (e) => {
    let settings_button = document.querySelector("#settingsBtn");
    let signIn_button = document.querySelector("#signInBtn");
    let home_button = document.querySelector("#home");

    settings_button.addEventListener('click', (e) => {
        document.location = "/settings";
    });

    signIn_button.addEventListener('click', (e) => {
        document.location = "/login";
    });

    home_button.addEventListener('click', (e) => {
        // api.getTeamByName("NFL", "San Francisco 49ers").then(team => {
        //     console.log(team);
        // }).catch(error => {
        //     console.log("error getting team!");
        // });
        document.location = "/";
    });
});
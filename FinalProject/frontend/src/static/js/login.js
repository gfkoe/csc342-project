import api from "./APIClient.js";

const loginButton = document.querySelector("#loginButton");
const username = document.querySelector("#userText");
const password = document.querySelector("#passText");
const createAccountButton = document.querySelector("#createAccountButton");
const errorBox = document.querySelector("#errorbox");

loginButton.addEventListener("click", (e) => {
  errorBox.classList.add("hidden");

  api
    .logIn(username.value, password.value)
    .then((userData) => {
      document.location = "./";
    })
    .catch((err) => {
      errorBox.classList.remove("hidden");
      if (err.status === 401) {
        errorBox.innerHTML = "Invalid username or password";
      } else {
        errorBox.innerHTML = err;
      }
    });
});

createAccountButton.addEventListener("click", (e) => {
  document.location = "./create_account";
});

import api from "./APIClient.js";

const loginButton = document.querySelector("#loginButton");
const username = document.querySelector("#userText");
const password = document.querySelector("#passText");

const errorBox = document.querySelector("#errorbox");

loginButton.addEventListener("click", (e) => {
  errorBox.classList.add("hidden");

  api
    .logIn(username.value, password.value)
    .then((userData) => {
      console.log(userData);
      document.location = "./?id=" + userData.user.id;
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

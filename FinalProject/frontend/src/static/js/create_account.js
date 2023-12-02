import api from "./APIClient.js";

const firstInput = document.querySelector("#firstText");
const lastInput = document.querySelector("#lastText");
const usernameInput = document.querySelector("#userText");
const passInput = document.querySelector("#passText");
const passConfirmedInput = document.querySelector("#confirmPassText");
// const avatarLinkInput = document.querySelector("#avatarText");

const createAccountButton = document.querySelector("#createAccountButton");
const backButton = document.querySelector("#backButton");

backButton.addEventListener("click", () => {
  document.location = "../login";
});

createAccountButton.addEventListener("click", (e) => {
  e.preventDefault();
  let first = firstInput.value;
  let last = lastInput.value;
  let username = usernameInput.value;
  let password = passInput.value;
  let passwordConfirmed = passConfirmedInput.value;
  // let avatar = avatarLinkInput.value;
  // console.log(password);
  if (
    first === "" ||
    last === "" ||
    username === "" ||
    password === "" ||
    passwordConfirmed === ""
  ) {
    alert("All fields are required");
    return;
  }

  if (password.length < 10) {
    alert("Password must be at least 10 characters long");
    return;
  }
  if (password !== passwordConfirmed) {
    alert("Passwords must match");
    return;
  }
  // console.log(username);
  api
    .createAccount(first, last, username, password)
    .then((user) => {
      console.log(user);
      document.location = "./";
    })
    .catch((error) => {
      console.log(error);
      alert("Username is already registered");
    });
});

import api from "./APIClient.js";

document.addEventListener("DOMContentLoaded", () => {
  const logoutButton = document.querySelector("#logoutButton");

  logoutButton.addEventListener("click", () => {
    api
      .logOut()
      .then(() => {
        document.location = "/login";
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  });

  // Fetch and display user details (replace with your API call)
  api.getCurrentUser()
    .then((user) => {
      updateProfile(user);
    })
    .catch((error) => {
      console.error("Error fetching user details:", error);
    });
});

document.addEventListener("DOMContentLoaded", async () => {
    // Fetch current user data
    try {
      const currentUser = await api.getCurrentUser();
      updateProfile(currentUser);
    } catch (error) {
      if (error.status === 401) {
        console.log("User not logged in");
        // Redirect to login page or handle as needed
      } else {
        console.error("Error fetching user data:", error);
      }
    }
  });

function updateProfile(user) {
  const profileImage = document.querySelector("#profileImage");
  const username = document.querySelector("#username");
  const fullName = document.querySelector("#fullName");

  profileImage.src = user.avatar;
  username.textContent = `Username: ${user.username}`;
  fullName.textContent = `Full Name: ${user.first_name} ${user.last_name}`;
}

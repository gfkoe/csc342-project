1) What is Done?
    We have implemented a mysql (mariadb) database that current holds two users. We have tested our user endpoints for getting the current user, logging in a user and logging out a user which seem to work. We have made an account page which shows the logged in user (with profile pic) and allows them to logout. We have implemented a .env file locally and in the vm. Our docker compose is also updated to build the database so we can interact with it through requests (such as retrieving a user from the database).
    
    
2. What is not done?
    We still need to implement our team page for sports team which we have an external api lined up for. We also are going to use the API for live scoring as well. We are going to implement a schedule page as well. We also need to disable settings buttons in order to prevent non-logged in users from picking a favorite team (there are no teams in the database atm so they cannot do anything yet but will be a problem later if we do not update) Those are the main things that need to be done.

3. We are using jwt authentication to sign and verify tokens. We have implemented an API Secret Key as well which is stored in our .env file. We are only allowing accounts the ability to select a favorite team and save so that they can quickly access team pages. There are no teams currently in the database so they cannot select their favorite team. The idea is we will not allow non-logged in users the ability to select their favorite teams for convenience. The non-logged in users can still access the settings page at the moment but it does not currently do anything.

4. All Pages
    - home.html (home page for users logged-in and not logged-in)
    - login.html (login page for users who want to create an account or login)
    - mlb.html (major league baseball homepage)
    - mls.html (major league soccer homepage)
    - nba.html (na)

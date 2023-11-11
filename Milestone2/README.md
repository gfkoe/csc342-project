1) What is Done?
    We have implemented a mysql (mariadb) database that current holds two users. We have tested our user endpoints for getting the current user, logging in a user and logging out a user which seem to work. We have made an account page which shows the logged in user (with profile pic) and allows them to logout. We have implemented a .env file locally and in the vm. Our docker compose is also updated to build the database so we can interact with it through requests (such as retrieving a user from the database).
    
    
2. What is not done?
    We still need to implement our team page for sports team which we have an external api lined up for. We also are going to use the API for live scoring as well. We are going to implement a schedule page as well. We also need to disable settings buttons in order to prevent non-logged in users from picking a favorite team (there are no teams in the database atm so they cannot do anything yet but will be a problem later if we do not update) Those are the main things that need to be done.

3. We are using jwt authentication to sign and verify tokens. We have implemented an API Secret Key as well which is stored in our .env file. We are only allowing accounts the ability to select a favorite team and save so that they can quickly access team pages. There are no teams currently in the database so they cannot select their favorite team. The idea is we will not allow non-logged in users the ability to select their favorite teams for convenience. The non-logged in users can still access the settings page at the moment but it does not currently do anything.

4. All Pages
    - home.html (home page for users logged-in and not logged-in) (partially complete)
    - login.html (login page for users who want to create an account or login) (partially complete)
    - mlb.html (major league baseball homepage) (partially complete)
    - mls.html (major league soccer homepage) (partially complete)
    - nba.html (national basketball association (hopefully that is right) homepage) (partially complete)
    - nfl.html (national football league homepage) (partially complete)
    - settings.html (account settings page) (partially complete)
    - tp.html (homepages for all teams across all leagues) (partially complete)

5. Wireframes to Pages
- We only have one wireframe to all of our pages. This is the link -> the pages all have been partially completed, so I don't believe any are completely finished -> [Link To Wireframe](../Proposal/Wireframes/Project%20Proposal%20CSC%20342%20-%20Wireframes.png);

6. All API Endpoints And Their Behavior
    - post("/users/login") 
    // takes a user username and password and checks the database to determine if we have a valid user and then logs in that user

    - post("/users/logout")
    // takes the currently logged in user and removes them as the current user (aka logs them out)

    - get("/users/current")
    // returns the currently logged in user

    - get("/users/:userId")
    // get a user from the database with a passed user id

    // NOTE: TeamRoutes will be updated in order to use an external api so these paths wont match but the idea behind these paths will still be implements

    - get("/leagues/:leagueId/schedule")
    // get a sports league weekly schedule for printing all games on the main league pages

    - get("/games/:gameId/score")
    // get updates for the score of a live game

    - get("/teams/:teamId")
    // gets a team with a passed team id

7. ER Diagram


8. Team Contributions

Jake:
    -

Gabe:
    -Database, file system, login page, refactor api, VM debugging

Jai:
    -Authentication, Account dynamic implementation

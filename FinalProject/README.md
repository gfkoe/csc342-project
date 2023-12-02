1) What works?
    We have a working login system, with account creation. Accounts are stored and can be logged back in. Our PWA is installable, however I was not able to test offline functionality. We have a working frontend and REST Api using Express.
    
JAKE ADD HERE:    
    
2. Authenticaiton and authorization
    Our authentication system uses JWT web tokens to store the currently logged in user. Our backend queries our database, checking if there is a user with the given username and password, and then logs in upon success. JWT is using an api key that is stored in .env, and is not accessable to the user. Authorization for created accounts is based on whether or not they already exist within the database. We also were not able to implement protection against accessing the endpoints by any given user.

4. All Pages
    - home.html (home page for users logged-in and not logged-in) (partially complete)
    - login.html (login page for users who want to create an account or login) (complete)
    - create_account.html (allows users to create accounts and logs them in, or go back to the login page) (complete)
    - mlb.html (major league baseball homepage) (partially complete)
    - mls.html (major league soccer homepage) (partially complete)
    - nba.html (national basketball association (hopefully that is right) homepage) (partially complete)
    - nfl.html (national football league homepage) (partially complete)
    - settings.html (account settings page) (partially complete)
    - tp.html (homepages for all teams across all leagues) (partially complete)
    - account.html (shows account info, allows user to log out, and allows them to go back to home) (complete)

5. Wireframes to Pages
- We only have one wireframe to all of our pages. This is the link -> the pages all have been partially completed, so I don't believe any are completely finished -> [Link To Wireframe](../Proposal/Wireframes/Project%20Proposal%20CSC%20342%20-%20Wireframes.png);

6. All API Endpoints And Their Behavior
    - post("/users/login") 
    // takes a user username and password and checks the database to determine if we have a valid user and then logs in that user
    
    -post("/users/create")
    // creates a new user with the first name, last name, username, and password and adds them to the system, logging in
    // Unfortunately, after creating an account then logging in, I am not able to log back in. When trying to make an account with that username again,
    // it is already in use
    
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
    - https://lucid.app/lucidchart/867f6ac4-53d2-49da-9407-28c0546f6da1/edit?viewport_loc=-158%2C-633%2C2867%2C1487%2C0_0&invitationId=inv_19848442-85ec-4d9c-b0c6-f341d8403c03


8. Team Contributions

Jake:
    - Database, got together a plan for external API for teams, schedules, and live scoring. Updating static JS which involved page navigation. Also helped with VM debugging with Gabe.

Gabe:
    -Worked on the file structure, API, getting Repo set up along with VM, getting dockerfile's and worked on the database. Also worked on logging in, account creation, and User API features. For the final submission, spent time doing working on installability, account creation, and worked with Jake on figuring out the team database and the external API. Helped with frontend when I could, but we were pressed for time, most of which I spent on the backend.

Jai:
    -Authentication, Account dynamic implementation

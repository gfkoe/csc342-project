1. What works?
    We have a working login system, with account creation. Accounts are stored and can be logged back in. Our PWA is installable, however I was not able to test offline functionality. We have a working frontend and REST Api using Express. We have also added a database table for games and teams which both work and show in mysql. They have Model classes and DAOS for each ones. We have also determined how to correctly import our external API which we are going to extract the data to populate our games table and for one field in our teams table.   
    
2. Authenticaiton and authorization
    Our authentication system uses JWT web tokens to store the currently logged in user. Our backend queries our database, checking if there is a user with the given username and password, and then logs in upon success. JWT is using an api key that is stored in .env, and is not accessable to the user. Authorization for created accounts is based on whether or not they already exist within the database. We also were not able to implement protection against accessing the endpoints by any given user.

3. Cache 
    The service worker in the described system employs a cache-first strategy, primarily caching static assets (HTML, CSS, JavaScript, and images) during installation for offline access. For dynamic requests, the network is checked first, with the cache serving as a fallback if the network is unavailable, providing an offline experience for critical parts of the application Caching static assets is chosen due to their infrequent changes and essential role in app functionality. The cache fallback ensures that, for dynamic requests, some existing data can be displayed even if not entirely up-to-date. An offline page serves as a last resort when no data is available. This approach strikes a balance, offering offline capabilities while prioritizing network access for updated data. The cache is versioned and cleaned up during the activation event to prevent indefinite growth.

4. What doesn't work?
 - We still need to populate our static js pages with the contents we are storing in the database in order to complete our dynamic team page which will update based on which team page we are on. We plan to be able to display the team name as the header and include a logo as well which is supplied by the external API. We also need to finish the static js for live scoring, but we have the external API ready to be able to store that information in the database (for games) and to get live scoring information as well. There are a couple of methods that need to be finished on the backend but will be quick. That should be mainly it.


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
    
    - post("/users/create")
    // creates a new user with the first name, last name, username, and password and adds them to the system, logging in
    // Unfortunately, after creating an account then logging in, I am not able to log back in. When trying to make an account with that username again,
    // it is already in use
    
    - post("/users/logout")
    // takes the currently logged in user and removes them as the current user (aka logs them out)

    // returns the currently logged in user
    - get("/users/current")

    // get a user from the database with a passed user id
    - get("/users/:userId")

    // Initializes the games database table by calling external api to retrieve all games for a season for each league
    - post("/games/initialize")
    
    // gets all games for a team with a team id
    - get("/games/team/:teamId")

    // gets all games for a specific week (this endpoint may be modified)
    - get("/games/:weekNumber")

    // updates a game in the database to include a new status and the final scores for the home and away teams
    - put("/games/update")

    // Get all games in the database (This endpoint may be modified)
    get("/games/all")

    // gets a team with a team name from the database
    - get("/teams/:teamName")

    // gets a team with team id from the database
    - get("/teams/:teamid)

    // updates a team's logo field which is empty at start as it needs to pull from the external api to get the logo
    - put("/teams/logo/:teamName")



7. ER Diagram
    (ER Diagram)https://github.ncsu.edu/engr-csc342/csc342-2023Fall-GroupT/blob/main/FinalProject/ER%20Diagram.pdf


8. Team Contributions

Jake:
    - Database, got together a plan for external API for teams, schedules, and live scoring. Updating static JS which involved page navigation. Also helped with VM debugging with Gabe. For final project I created the API methods, models, and DAOs for our games and teams tables. I also created the code that creates the databases in db_schema. I also created an account and researched and implemented our external api as well.

Gabe:
    -Worked on the file structure, API, getting Repo set up along with VM, getting dockerfile's and worked on the database. Also worked on logging in, account creation, and User API features. For the final submission, spent time doing working on installability, account creation, and worked with Jake on figuring out the team database and the external API. Helped with frontend when I could, but we were pressed for time, most of which I spent on the backend.

Jai:
    -Routes, Authentication, Account dynamic implementation, Offline Functionality

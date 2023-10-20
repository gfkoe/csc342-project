# Sports Place

## Group T: Milestone 1

## Milestone Report

### What is done:

    Over 50% of HTML pages complete with static functionality

    Initial API endpoints complete

    Mock JSON data is set up

### What is not done:

    Need to add schedule HTML files for all of the leagues (Team Schedule, Live Scoring)

    Need to add static js functionality - currently all HTML is served with a tags. Need to make data automatically fill instead of doing it all manually.

    Incorporate API into the frontend

### Frontend Pages

| Pages     | Status | Wireframe                                                                                                                                                 |
| --------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Login     | 75%    | [wireframe](https://github.ncsu.edu/engr-csc342/csc342-2023Fall-GroupT/blob/main/Proposal/Wireframes/Project%20Proposal%20CSC%20342%20-%20Wireframes.png) |
| Home      | 75%    | [wireframe](https://github.ncsu.edu/engr-csc342/csc342-2023Fall-GroupT/blob/main/Proposal/Wireframes/Project%20Proposal%20CSC%20342%20-%20Wireframes.png) |
| mlb       | 75%    | [wireframe](https://github.ncsu.edu/engr-csc342/csc342-2023Fall-GroupT/blob/main/Proposal/Wireframes/Project%20Proposal%20CSC%20342%20-%20Wireframes.png) |
| mls       | 75%    | [wireframe](https://github.ncsu.edu/engr-csc342/csc342-2023Fall-GroupT/blob/main/Proposal/Wireframes/Project%20Proposal%20CSC%20342%20-%20Wireframes.png) |
| nba       | 75%    | [wireframe](https://github.ncsu.edu/engr-csc342/csc342-2023Fall-GroupT/blob/main/Proposal/Wireframes/Project%20Proposal%20CSC%20342%20-%20Wireframes.png) |
| nfl       | 75%    | [wireframe](https://github.ncsu.edu/engr-csc342/csc342-2023Fall-GroupT/blob/main/Proposal/Wireframes/Project%20Proposal%20CSC%20342%20-%20Wireframes.png) |
| Settings  | 75%    | [wireframe](https://github.ncsu.edu/engr-csc342/csc342-2023Fall-GroupT/blob/main/Proposal/Wireframes/Project%20Proposal%20CSC%20342%20-%20Wireframes.png) |
| Team Page | 75%    | [wireframe](https://github.ncsu.edu/engr-csc342/csc342-2023Fall-GroupT/blob/main/Proposal/Wireframes/Project%20Proposal%20CSC%20342%20-%20Wireframes.png) |

### API Endpoints

| Method | Route                         | Description                       |
| ------ | ----------------------------- | --------------------------------- |
| 'POST' | '/login'                      | Receives a username and password  |
| 'POST' | '/register'                   | Receives a username and password  |
| 'GET'  | '/leagues/:leagueId/schedule' | Receives schedule data for league |
| 'GET'  | '/games/:gameId/score'        | Receives score data for games     |
| 'GET'  | '/teams/:teamId'              | Receives team info                |

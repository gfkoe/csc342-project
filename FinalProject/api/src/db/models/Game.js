module.exports = class {
    id = null;
    league = null;
    date = null;
    time = null;
    timestamp = null;
    stage = null;
    week = null;
    home_team_name = null;
    away_team_name = null;
    status = null;
    final_home_score = null;
    final_away_score = null;

    constructor(data) {
        this.id = data.id;
        this.league = data.league;
        this.date = data.date;
        this.time = data.time;
        this.timestamp = data.timestamp;
        this.stage = data.stage;
        this.week = data.week;
        this.home_team_name = data.home_team_name;
        this.away_team_name = data.away_team_name;
        this.status = data.status;
        this.final_home_score = data.final_home_score;
        this.final_away_score = data.final_away_score;
    }

    toJSON() {
        return {
            id: this.id,
            league: this.league,
            date: this.date,
            time: this.time,
            timestamp: this.timestamp,
            stage: this.stage,
            week: this.week,
            home_team_name: this.home_team_name,
            away_team_name: this.away_team_name,
            status: this.status,
            final_home_score: this.final_home_score,
            final_away_score: this.final_away_score
        }
    }
}
module.exports = class {
    id = null;
    date = null;
    timestamp = null;
    week = null;
    home_team_id = null;
    away_team_id = null;
    status = null;
    final_home_score = null;
    final_away_score = null;

    constructor(data) {
        this.id = data.id;
        this.date = data.date;
        this.timestamp = data.timestamp;
        this.week = data.week;
        this.home_team_id = data.home_team_id;
        this.away_team_id = data.away_team_id;
        this.status = data.status;
        this.final_home_score = data.final_home_score;
        this.final_away_score = data.final_away_score;
    }

    toJSON() {
        return {
            id: this.id,
            date: this.date,
            timestamp: this.timestamp,
            week: this.week,
            home_team_id: this.home_team_id,
            away_team_id: this.away_team_id,
            status: this.status,
            final_home_score: this.final_home_score,
            final_away_score: this.final_away_score
        }
    }
}
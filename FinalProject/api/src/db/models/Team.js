module.exports = class {
    id = null;
    league = null;
    name = null;
    abbreviation = null;
    conference = null;
    division = null;
    logo = null;

    constructor(data) {
        this.id = data.id;
        this.league = data.league;
        this.name = data.name;
        this.abbreviation = data.abbreviation;
        this.conference = data.conference;
        this.division = data.division;
        this.logo = data.logo;
    }

    toJSON() {
        return {
            id: this.id,
            league: this.league,
            name: this.name,
            abbreviation: this.abbreviation,
            conference: this.conference,
            division: this.division,
            logo: this.logo          
        }
    }
};
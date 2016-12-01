(function () {

	var router = require('express').Router();
    var Sport = require('../db/models/sport');
    var League = require('../db/models/league');
    var Team = require('../db/models/team');
    var Player = require('../db/models/player');
    

    router.route('/sports/:id?')
        .get(Sport.getSports)
        .post(Sport.addSport)
        // .put(Sport.editSport)
        // .delete(Sport.removeSport);
        
    router.route('/leagues/:id?')
        .get(League.getLeagues)
        .post(League.addLeague)
        // .put(League.editLeague)
        // .delete(League.removeLeague);
    /**
     * Your Code Here
     */

    router.route('/teams/:id?')
        .get(Team.getTeams)
        .post(Team.addTeam)
    //     .put(Team.editTeam)
    //     .delete(Team.removeTeam);

    router.route('/players/:id?')
        .get(Player.getPlayers)
        .post(Player.addPlayer)
    //     .put(Player.editPlayer)
    //     .delete(Player.removePlayer);    
    
	//Make sure you export the router component
	exports.router = router;
	
})();
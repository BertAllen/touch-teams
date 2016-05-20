(function(){
    
    var db = require('../db');
    var path = require('path');	
	var uuid = require('node-uuid');	
	
    var Team = db.defineResource({
        name: 'team',
		filepath: path.join(__dirname, '/data/teams.db'),
		relations: {
		    belongsTo: {
                sport: {
                    localField: 'league',
                    foreignKey: 'leagueId'
                }
            },
			hasMany: {
				player: {
					localField: 'player',
					foreignKey: 'teamId'
				}
			}
		}
    })
    
    exports.getTeams = function (req, res, next) {

		getTeams().then(
			function (teams) {
				res.json(teams);
			}
		);
	}	
	
	exports.addTeam = function (req, res, next) {

		addTeam(req.body).then(
			function (team) {
				return res.json(team);
			}
		);
	}
    
    function getTeams() {

		var params = {};
		
		var options = {
			//  with: ['']
		};
		
		return Team.findAll(params, options);	
	}
	
	function addTeam(team) {

		return Team.create(team);			
	}
}())
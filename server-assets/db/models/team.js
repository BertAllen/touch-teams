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
        if (req.params.id) {
            getTeams(req.params.id).then(
                function (teams) {
                    return res.json(teams);
                })
        } else {
            getTeams(req.query)
                .then(function (teams) {
                    return res.json(teams)
                })
        }
	}	
	
	exports.addTeam = function (req, res, next) {

        addTeam(req.body.name, req.body.description)
            .then(function (team) {
				return res.json(team);
			}
		);
    }

    exports.getTeam = function (req, res, next) {
        getTeam(req.params.id).then(function (team) {
            console.log(team);
            return res.json(team[0]);
    })
}
    
    function getTeams(query) {

		var params = query;
		
		var options = {
			 with: ['player']
		};
		
		return Team.find(id, options);	
	}
	
	function addTeam(name, description) {

        return Team.create({
            id: uuid.v4(),
            name: name,
            description: description
        });			
	}
}())
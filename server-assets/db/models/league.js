(function(){
    
    var db = require('../db');
    var path = require('path');	
	var uuid = require('node-uuid');	
	
    var League = db.defineResource({
        name: 'league',
		filepath: path.join(__dirname, '/data/leagues.db'),
		relations: {
		    belongsTo: {
                sport: {
                    localField: 'sport',
                    foreignKey: 'sportId'
                }
            },
			hasMany: {
				team: {
					localField: 'team',
					foreignKey: 'leagueId'
				}
			}
		}
    })
    
    exports.getLeagues = function (req, res, next) {

		getLeagues().then(
			function (leagues) {
				res.json(leagues);
			}
		);
	}	
	
	exports.addLeague = function (req, res, next) {

		addLeague(req.body).then(
			function (league) {
				return res.json(league);
			}
		);
	}
    
    function getLeagues() {

		var params = {};
		
		var options = {
			//  with: ['']
		};
		
		return League.findAll(params, options);	
	}
	
	function addLeague(league) {

		return League.create(league);			
	}
}())
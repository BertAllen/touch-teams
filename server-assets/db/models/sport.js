(function() {

    var db = require('../db');
    var path = require('path');
    var uuid = require('node-uuid');

    var Sport = db.defineResource({
        name: 'sport',
        filepath: path.join(__dirname, '/data/sports.db'),
        relations: {
            hasMany: {
                league: {
                    localField: 'leagues',
                    foreignKey: 'sportId'
                }
            }
        }
    })

    exports.getSports = function(req, res, next) {
        if (req.params.id) {
            getSport(req.params.id).then(function(sport) {
                return res.json(sport)
            })
        } else {
            getSports(req.query).then(function(sports) {
                return res.json(sports);
            })
        }
    }

    exports.addSport = function(req, res, next) {

        addSport(req.body.name, req.body.description).then(function(sport) {
            return res.json(sport)
        })
    }

    exports.getSport = function(req, res, next) {
        getSport(req.params.id).then(function(sport) {
            console.log(sport)
            return res.json(sport[0]);
        })
    }


    function getSports(query) {

        var params = query

        var options = {
            with: ['league']
        };

        return Sport.findAll(params, options);
    }

    function getSport(id) {
        var options = {
            with: ['league']
        };
        return Sport.find(id, options);
    }

    function addSport(name, description) {

        return Sport.create({
            id: uuid.v4(),
            name: name,
            description: description
        });
    }

} ())
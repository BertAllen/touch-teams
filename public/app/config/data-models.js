(function () {

    angular.module('teams')
        .service('Models', function (DS) {
            var ms = this;

            ms.Sport = DS.defineResource({
                name: 'sport',
                endpoint: 'sports',
                relationships: {
                    hasMany: {
                        league: {
                            localField: 'leagues',
                            foreignKey: 'sportId'
                        }
                    }
                    // enumerable: true
                }
            })

            ms.League = DS.defineResource({
                name: 'league',
                endpoint: 'leagues',
                relationships: {
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

            ms.Team = DS.defineResource({
                name: 'team',
                endpoint: 'teams',
                relationships: {
                    belongsTo: {
                        league: {
                            localField: 'league',
                            foreignKey: 'leagueId'
                        }
                    },
                    hasMany: {
                        player: {
                            localField: 'player',
                            foreignKey: 'team'
                        }
                    }
                }
            })

            ms.Player = DS.defineResource({
                name: 'player',
                endpoint: 'players',
                relationships: {
                    belongsTo: {
                        team: {
                            localField: 'team',
                            foreignKey: 'teamId'
                        }
                    }

                }
            })

        })

} ())
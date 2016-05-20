(function(){
    
    angular.module('teams')
        .component('sportComponent', {
            templateUrl: 'app/components/sport/sport.html',
            controller: SportController
        })
        
        function SportController($state, Models){
            var $ctrl = this;


            Models.Sport.findAll({name: $state.params.sport}, {bypassCache: true}).then(function(sport){
              $ctrl.sport = sport[0];
            })
            
            $ctrl.addLeague = function(league){
                league.sportId = $ctrl.sport.id;
                Models.League.create(league)
                $ctrl.newLeague = {}
            }
        }
    
}())
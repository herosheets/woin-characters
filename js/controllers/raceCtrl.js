
angular = require('angular');

angular.module('woin-character')
  .controller('RaceCtrl', function RaceCtrl($scope, $rootScope) {

    var KEY = $scope.KEY = 'Race';
    if(!$scope.character[KEY]) $scope.character[KEY] = {};
    $scope.generalHash = $scope.$parent.generalHash;

    $scope.changeRace = function() {
        var raceExploits = $scope.character.race.Exploits.split(', ');

        $scope.character.exploits = $scope.character.exploits || [];

        _.each($scope.character.exploits, function(exploit) {
           if(!exploit || !_.contains($rootScope.raceExploits, exploit.Exploit)) return;
            $scope.character.exploits = _.reject($scope.character.exploits, { Exploit: exploit.Exploit });
        });

        _.each(raceExploits, function(exploit) {
           $scope.character.exploits.push($scope.exploitsHash[exploit]);
        });

        $rootScope.raceExploits = raceExploits;
    };

    $scope.printAttributes = function(attributeString) {
      var attributes = (attributeString || '').split(',');
      var printString = '';
      angular.forEach(attributes, function(attr) {
        if(!attr) return;
        var tokens = attr.split(':');
        printString += tokens[0].toUpperCase() + " +" + tokens[1] + ', ';
      });

      return printString.substring(0, printString.length - 2);
    };

  });
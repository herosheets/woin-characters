
angular = require('angular');

angular.module('woin-character')
  .controller('CareersCtrl', ['ExploitService', '$rootScope', '$scope', function CareersCtrl(ExploitService, $rootScope, $scope) {

    var KEY = $scope.KEY = 'careers';

    $scope.atMaxCareers = function() {
        return _.reduce(_.values($scope.character[KEY]), function(prev, cur) { return prev + cur; }, 0) >= 4;
    };

    $rootScope.careerExploitStrings = $rootScope.careerExploitStrings || [];
    $rootScope.careerExploits = $rootScope.careerExploits || [];

    $scope.chooseCareer = function(career) {
        $scope.incrementItem(KEY, career.Career, 1);

        $rootScope.careerExploits.push({ career: career.Career, exploit: career._currentExploit });

        $scope.character.exploits = $scope.character.exploits || [];
        $scope.character.exploits.push($scope.exploitsHash[career._currentExploit]);
        $rootScope.careerExploitStrings.push(career._currentExploit);

        career._currentExploit = null
        $scope.character.calculateMinimumAge();
    };

    $scope.removeCareer = function(careerName, exploitLost) {
        $scope.decrementItem(KEY, careerName, 1);

        $rootScope.careerExploitStrings = _.reject($rootScope.careerExploitStrings, function(carObj) { return carObj.exploit === exploitLost; });
        $scope.character.exploits = _.reject(career._currentExploit, function(car) { return car.Exploit === exploitLost; });
        $rootScope.careerExploits = _.reject(career._currentExploit, function(car) { return car === exploitLost; });
        $scope.character.calculateMinimumAge();
    };

    $scope.printAttributes = function(attributeString) {
      if(!attributeString) attributeString = '';
      var attributes = attributeString.split(',');
      var printString = '';
      angular.forEach(attributes, function(attr) {
        var tokens = attr.split(':');
        printString += tokens[0].toUpperCase() + " +" + tokens[1] + ', ';
      });

      return printString.substring(0, printString.length - 2);
    };

    $scope.exploitsFilteredRequirements = function(career) {
      if(!career.Exploits) return [];
      var exploits = career.Exploits.split(',');
      return _.filter(exploits, function(exploit) {
        return ExploitService.meetsCareerRequirements($scope.character, exploit, $scope.exploitsHash);
      });
    };

    $scope.calculateCareerXpCost = function() {
      return $scope.character.calculateCareerXpCost();
    };

  }]);
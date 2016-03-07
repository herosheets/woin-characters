
angular = require('angular');

angular.module('woin-character')
  .controller('CharacterViewCtrl', function CharacterViewCtrl($scope) {
    $scope = $scope.$parent;

    var calcStatsForCareer = function(career) {
      var careerStats = _.reduce(career.Attributes.split(','), function(prev, stat) {
          var statSplit = stat.split(':');
          prev[statSplit[0].toUpperCase()] = +statSplit[1];
          return prev;
      }, {});
      return careerStats;
    };

    var getDiceForStat = function(stat) {
        if(stat < 3)  return 1;
        if(stat < 6)  return 2;
        if(stat < 10) return 3;
        if(stat < 15) return 4;
        return 5;
    };

    $scope.getStatForCharacter = function(stat) {
        var base = _.contains(['REP', 'CHI', 'MAG', 'PSI'], stat) ? 0 : 3;
        base += _.reduce($scope.character.careers, function(prev, cur) {
            return prev + calcStatsForCareer(cur)[stat] || 0;
        }, 0);
        return base;
    };

    $scope.getDiceValueForCharacter = function(stats) {
        if(!_.isArray(stats)) stats = [stats];

        var base = 0;
        base += _.reduce(stats, function(prev, cur) {
            return prev + getDiceForStat($scope.getStatForCharacter(cur));
        }, 0);
        return base;
    };

    $scope.getDiceForCharacter = function(stats) {
        return $scope.getDiceValueForCharacter(stats)+'d6';
    };

    $scope.calculateJump = function() {
      var horizontal = $scope.getStatForCharacter('AGI') * 2;
      var vertical = $scope.getStatForCharacter('STR') * 2;
      return horizontal + "\'/" + vertical + "\'";
    };

    $scope.calculateCarry = function() {
      var weight = ($scope.getStatForCharacter('STR') + $scope.getStatForCharacter('END')) * 10;
      return weight + 'lbs';
    };

    $scope.printCareers = function() {
      var str = "";
      angular.forEach($scope.character.careers, function(career) {
        str += career.Career + ", ";
      });
      str = str.replace(new RegExp(', ' + '$'), '.');
      return str;
    };

  });

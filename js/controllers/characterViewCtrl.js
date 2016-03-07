
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

    $scope.getStatForCharacter = function(stat) {
        var base = 0;
        base += _.reduce($scope.character.careers, function(prev, cur) {
            return prev + calcStatsForCareer(cur)[stat] || 0;
        }, 0);
        return base;
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

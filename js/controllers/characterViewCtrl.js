
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

    $scope.calculateSpeed = function() {
      var baseValue = $scope.getDiceValueForCharacter(['STR', 'AGI']);
      if ($scope.character.getSkillRanks('running') > 0) {
        return baseValue + 1;
      } else {
        return baseValue;
      }
    };

    $scope.calculatePerception = function() {
      var baseValue = $scope.getDiceValueForCharacter(['INT']);
      var modifier = $scope.character.getSkillRanks("perception");
      return baseValue + modifier + "d6";
    };

    $scope.calculateActions = function() {
      return 2;
    };

    $scope.calculateNaturalDamage = function() {
      var dice = "1d6";
      if ($scope.character.race !== undefined) {
        if ($scope.character.race.Race === 'Felan') {
          dice = "2d6";
        }
        if ($scope.character.race.Size === 'Large') {
          dice = "2d6"
        }
      }

      var modifier = "";
      var strModifier = $scope.getDiceValueForCharacter(['STR']);
      var combatModifier = $scope.character.getSkillRanks('unarmed combat');
      if (strModifier > combatModifier) {
        modifier = " + " + strModifier;
      } else {
        modifier = " + " + combatModifier;
      }
      return dice + modifier;
    };

    $scope.calculateClimb = function() {
      var baseValue = $scope.getDiceValueForCharacter(['STR', 'AGI']);
      // TODO : special exploit which doesn't halve climb
      return baseValue / 2;
    };

    $scope.calculateCarry = function() {
      var weight = ($scope.getStatForCharacter('STR') + $scope.getStatForCharacter('END')) * 10;
      return weight + 'lbs';
    };

    $scope.calculateDefense = function(defenseType) {
      var types = {
        MELEE: {
          attributes: ["STR", "AGI"],
          skills: ["acrobatics", "dodging", "foresight"]
        },
        RANGED: {
          attributes: ["AGI"],
          skills: ["acrobatics", "dodging", "foresight"]
        },
        MENTAL: {
          attributes: ["INT", "LOG", "WIL"],
          skills: ["concentration", "meditation"]
        }
      };

      var maxArray = function(array) {
        return Math.max.apply(null, array);
      };

      var defenseMap = function(pool) {
        var defense = 0;
        if (pool === 1) {
          defense = 4;
        }
        if (pool === 2) {
          defense = 7;
        }
        if (pool === 3) {
          defense = 11;
        }
        if (pool === 4) {
          defense = 14;
        }
        if (pool === 5) {
          defense = 18;
        }
        if (pool === 6) {
          defense = 21;
        }
        if (pool === 7) {
          defense = 25;
        }
        if (pool === 8) {
          defense = 28;
        }
        if (pool === 9) {
          defense = 32;
        }
        return defense;
      };

      var attrVal = _.map(types[defenseType].attributes, function(a) {
        $scope.getDiceValueForCharacter([a]);
        console.log("Attr: " + a);
        console.log("get dice val for a: " + $scope.getDiceValueForCharacter([a]));
        return $scope.getDiceValueForCharacter([a]);
      });

      var skillVal = _.map(types[defenseType].skills, function(s) {
        return $scope.character.getSkillRanks(s);
      });

      console.log("Attr vals:");
      console.log(attrVal)
      console.log("Skill vals:");
      console.log(skillVal)
      var attrMax = maxArray(attrVal);
      var skillMax = maxArray(skillVal);

      // TODO: return equipment
      return defenseMap(attrMax + skillMax);
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


angular = require('angular');

angular.module('woin-character')
  .controller('SkillsCtrl', function SkillsCtrl($scope) {

    var categoryLookup = {
      artistic: [
        "painting", "sculpting", "calligraphy", "pottery", "poetry", "literature", "film-making", "photography", "printmaking", "modelling"
      ],
      combat: [
        "fighting"
      ],
      scientific: [
        "physics",
        "astronomy", "chemistry", "ecology", "oceanography", "geology", "meteorology", "biology", "zoology", "botany", "mathematics", "archaeology", "criminology", "economics", "psychology", "sociology", "medicine", "genetics", "nanotechnology", "xenology", "climatology"],
      technical: [
        "computers", "engineering", "demolitions"
      ]
    };

    var getOptions = function(options) {
      var tokens = options.split(',');
      var choices = [];
      angular.forEach(tokens, function(t) {
        var trimmed = t.trim();
        if (trimmed.startsWith('[')) {
          var newToken = trimmed.slice(1,-1);
          choices.push(categoryLookup[newToken]);
        } else {
          choices.push(trimmed);
        }
      });
      return _.compact(_.flatten(choices));
    }

    var newChoice = function(options, source, name) {
      return {
        choices: getOptions(options),
        sourceType: source,
        sourceName: name
      };
    };

    var addBonusSkill = function() {
      console.log("Adding bonus skill: ");
      console.log($scope.character.homeworld);
      if ($scope.character.homeworld !== undefined) {
        upgradeSkill($scope.character.homeworld['Bonus Skill'], $scope.character.skills);
      }
    };

    var getSkillDicePool = function() {
      var r = this.rank;
      var pool = "1d6";
      if (r > 2) {
        pool = "2d6";
      }
      if (r > 5) {
        pool = "3d6";
      }
      if (r > 9) {
        pool = "4d6";
      }
      if (r > 14) {
        pool = "5d6";
      }
      return pool;
    }

    var upgradeSkill = function(skill, skills) {
      var found = false;
      angular.forEach(skills, function(s) {
        if (s.name === skill) {
          s.rank += 1;
          found = true;
        }
      });

      if (found === false) {
        skills.push( { rank: 1, name: skill, dicePool: getSkillDicePool });
      }
    };

    var calculateSkillChoices = function() {
      var choices = [];

      console.log("Current careers:");
      console.log($scope.character.Careers);
      angular.forEach($scope.character.Careers, function(qty, career) {
        var localChoices = $scope.careerHash[career]['Skill Choices'];
        for (i = 0; i < qty; i++) {
          var idx = (i + 1) * 2;
          choices.push(newChoice(localChoices, 'Career', career + "-" + (idx - 1)));
          choices.push(newChoice(localChoices, 'Career', career + "-" + (idx)));
        }
      });
      console.log("Current race:");
      console.log($scope.character.race);
      if ($scope.character.race !== undefined) {
        choices.push(newChoice($scope.character.race['Skill Choices'], 'Race', $scope.character.race.Race + "-1"));
        choices.push(newChoice($scope.character.race['Skill Choices'], 'Race', $scope.character.race.Race + "-2"));
        choices.push(newChoice($scope.character.race['Skill Choices'], 'Race', $scope.character.race.Race + "-3"));
      };
      console.log("Current origin:");
      console.log($scope.character.origin);
      if ($scope.character.origin !== undefined) {
        choices.push(newChoice($scope.character.origin['Skill Choices'], 'Origin', $scope.character.origin.Origin));
      }
      console.log("calculated choices:")
      console.log(choices)
      return choices;
    };

    $scope.skillChoices = calculateSkillChoices();

    if ($scope.character.skills === undefined) {
      $scope.character.skills = [];
    };

    if(_.isUndefined($scope.character.skillChoices)) {
      $scope.character.skillChoices = {};
    }

    $scope.rebuildSkills = function() {
      $scope.character.skills = [];
      angular.forEach($scope.skillChoices, function(choice) {
        if ($scope.character.skillChoices[choice.sourceName] !== undefined) {
          upgradeSkill($scope.character.skillChoices[choice.sourceName], $scope.character.skills);
        }
      });
      addBonusSkill();
    };

    $scope.rebuildSkills();

  });

angular = require('angular');

angular.module('woin-character')
  .controller('HomelandCtrl', function HomelandCtrl($scope) {

    var KEY = $scope.KEY = 'Homelands';
    if(!$scope.character[KEY]) $scope.character[KEY] = {};

    angular.forEach($scope.homelands, function(homeland) {
      var homelandTokens = homeland['Bonus Skill'].split(' or ');
      homeland.bonus_skill_options = homelandTokens;
      if (homeland.bonus_skill_options.length === 1) {
        homeland.chosen_bonus_skill = homeland.bonus_skill_options[0];
      }
    });

    $scope.homelandHash = $scope.$parent.homelandHash;
  });
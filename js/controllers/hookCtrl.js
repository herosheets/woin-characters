
angular = require('angular');

angular.module('woin-character')
  .controller('HookCtrl', function HookCtrl($scope) {
    var KEY = $scope.KEY = 'Hook';
    if(!$scope.ship[KEY]) $scope.ship[KEY] = {};

    $scope.hookHash = $scope.$parent.hookHash;

  });
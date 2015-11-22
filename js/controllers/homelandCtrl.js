
angular = require('angular');

angular.module('woin-character')
  .controller('HomelandCtrl', function HomelandCtrl($scope) {

    var KEY = $scope.KEY = 'Homeland';
    if(!$scope.ship[KEY]) $scope.ship[KEY] = {};

    $scope.homelandHash = $scope.$parent.homelandHash;
  });
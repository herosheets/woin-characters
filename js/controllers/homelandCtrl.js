
angular = require('angular');

angular.module('woin-character')
  .controller('HomelandCtrl', function HomelandCtrl($scope) {

    var KEY = $scope.KEY = 'Homelands';
    if(!$scope.character[KEY]) $scope.character[KEY] = {};

    $scope.homelandHash = $scope.$parent.homelandHash;
  });
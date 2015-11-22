
angular = require('angular');

angular.module('woin-character')
  .controller('DerivedStatsCtrl', function DerivedStatsCtrl($scope) {
    var KEY = $scope.KEY = 'Derived Stats';
    $scope.generalHash = $scope.$parent.ftlHash;
  });
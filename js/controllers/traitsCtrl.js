
angular = require('angular');

angular.module('woin-character')
  .controller('Traits Ctrl', function TraitsCtrl($scope) {
    var KEY = $scope.KEY = 'Facilities';
    if(!$scope.ship[KEY]) $scope.ship[KEY] = {};

    $scope.facilitiesValueAddHash = {};
    $scope.facilitiesValueRemoveHash = {};

    $scope.facilitiesHash = $scope.$parent.facilitiesHash;
  });
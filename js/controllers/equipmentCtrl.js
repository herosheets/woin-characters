
angular = require('angular');

angular.module('woin-character')
  .controller('EquipmentCtrl', function EquipmentCtrl($scope) {

    var KEY = $scope.KEY = 'Equipment';
    if(!$scope.ship[KEY]) $scope.ship[KEY] = {};

    $scope.generalHash = $scope.$parent.generalHash;
  });
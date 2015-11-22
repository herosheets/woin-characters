
angular = require('angular');

angular.module('woin-character')
  .controller('PsionicsCtrl', function PsionicsCtrl($scope) {
    var PKEY = $scope.PKEY = 'Psionics';
    if(!$scope.ship[PKEY]) $scope.ship[PKEY] = {};

    $scope.psionicsHash = $scope.$parent.psionicsHash;


  });
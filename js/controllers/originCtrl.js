
angular = require('angular');

angular.module('woin-character')
  .controller('OriginCtrl', function OriginCtrl($scope) {
    var KEY = $scope.KEY = 'Origin';
    if(!$scope.ship[KEY]) $scope.ship[KEY] = {};

    $scope.originHash = $scope.$parent.originHash;


  });
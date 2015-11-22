
angular = require('angular');

angular.module('woin-character')
  .controller('MagicCtrl', function MagicCtrl($scope) {

    var KEY = $scope.KEY = 'Magic';
    $scope.magicHash = $scope.$parent.magicHash;
  });


angular = require('angular');

angular.module('woin-character')
  .controller('PsionicsCtrl', function PsionicsCtrl($scope) {
    var KEY = $scope.KEY = 'Psionics';
    if(!$scope.character[KEY]) $scope.character[KEY] = {};

    $scope.psionicsHash = $scope.$parent.psionicsHash;

    $scope.localPsionics = [];
    angular.copy($scope.psionics, $scope.localPsionics);
    console.log("Copy:");
    console.log($scope.localPsionics);

    console.log("Psionics:");
    console.log($scope.character.psionics);

    if ($scope.character.psionics === undefined) {
      $scope.character.psionics = [];
    };

    angular.forEach($scope.character.psionics, function(c) {
      deleteFromArray($scope.localPsionics, c);
    });

    $scope.addItem = function(c) {
      if ($scope.character.psionics.length < 4) {
        $scope.character.psionics.push(c);
        deleteFromArray($scope.localPsionics, c);
      }
    };

    $scope.removeItem = function(c) {
      $scope.localPsionics.push(c);
      deleteFromArray($scope.character.psionics, c);
    };

    var deleteFromArray = function(array, c) {
      var index = array.indexOf(c);
      array.splice(index, 1);
    };

  });
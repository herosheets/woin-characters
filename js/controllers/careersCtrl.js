
angular = require('angular');

angular.module('woin-character')
  .controller('CareersCtrl', function CareersCtrl($scope) {

    var deleteFromArray = function(array, c) {
      var index = array.indexOf(c);
      array.splice(index, 1);
    };

    $scope.localCareers = [];
    angular.copy($scope.careers, $scope.localCareers);
    console.log("Copy:");
    console.log($scope.localCareers);

    console.log("Careers:");
    console.log($scope.character.careers);

    if ($scope.character.careers === undefined) {
      $scope.character.careers = [];
    };

    angular.forEach($scope.character.careers, function(c) {
      deleteFromArray($scope.localCareers, c);
    });

    $scope.addItem = function(c) {
      if ($scope.character.careers.length < 4) {
        $scope.character.careers.push(c);
        deleteFromArray($scope.localCareers, c);
      }
    };

    $scope.removeItem = function(c) {
      $scope.localCareers.push(c);
      deleteFromArray($scope.character.careers, c);
    };


    $scope.printAttributes = function(attributeString) {
      var attributes = attributeString.split(',');
      var printString = '';
      angular.forEach(attributes, function(attr) {
        var tokens = attr.split(':');
        printString += tokens[0].toUpperCase() + " +" + tokens[1] + ', ';
      });

      return printString.substring(0, printString.length - 2);
    };
  });
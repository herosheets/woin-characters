angular = require('angular');

angular.module('woin-character')
  .controller('OriginCtrl', function OriginCtrl($scope) {
    var KEY = $scope.KEY = 'Origin';
    if(!$scope.character[KEY]) $scope.character[KEY] = {};

    $scope.originHash = $scope.$parent.originHash;

    console.log("Loaded origins:");
    console.log($scope.origins);
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

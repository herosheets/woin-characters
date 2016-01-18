
angular = require('angular');

angular.module('woin-character')
  .controller('RaceCtrl', function RaceCtrl($scope) {

    var KEY = $scope.KEY = 'Race';
    if(!$scope.character[KEY]) $scope.character[KEY] = {};
    $scope.generalHash = $scope.$parent.generalHash;

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
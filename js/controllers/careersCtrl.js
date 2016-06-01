
angular = require('angular');

angular.module('woin-character')
  .controller('CareersCtrl', function CareersCtrl($scope) {
    var KEY = $scope.KEY = 'careers';

    var deleteFromArray = function(array, c) {
      var index = array.indexOf(c);
      array.splice(index, 1);
    };

    $scope.atMaxCareers = function() {
        return _.reduce(_.values($scope.character[KEY]), function(prev, cur) { return prev + cur; }, 0) >= 4;
    }

    $scope.printAttributes = function(attributeString) {
      if(!attributeString) attributeString = '';
      var attributes = attributeString.split(',');
      var printString = '';
      angular.forEach(attributes, function(attr) {
        var tokens = attr.split(':');
        printString += tokens[0].toUpperCase() + " +" + tokens[1] + ', ';
      });

      return printString.substring(0, printString.length - 2);
    };
  });
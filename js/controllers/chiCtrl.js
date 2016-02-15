
angular = require('angular');

angular.module('woin-character').controller('ChiCtrl', function ChiCtrl($scope) {

    // TODO this needs to be set to the max chi available
    $scope.maxChi = 5;
    $scope.currentChi = 0;

    var KEY = $scope.KEY = 'Chi';
    if(!$scope.character[KEY]) $scope.character[KEY] = {};

    $scope.groupedChi = _.groupBy($scope.chis, 'Stance');
    _.each($scope.groupedChi, function(val, chi) {
        if(!$scope.character.Chi[chi]) $scope.character.Chi[chi] = [];
    });

    $scope.selectChi = function(chi, chiData) {
        if(!$scope.character.Chi[chi]) $scope.character.Chi[chi] = [];

        $scope.character.Chi[chi].push(chiData);
        $scope.currentChi++;
    };

    $scope.unselectChi = function(chi, chiData) {
        $scope.character.Chi[chi] = _.without($scope.character.Chi[chi], chiData);
        $scope.currentChi--;
    }
});
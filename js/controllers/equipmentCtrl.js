
angular = require('angular');

angular.module('woin-character')
  .controller('EquipmentArmorCtrl', function EquipmentCtrl($scope) {
    $scope.armor = $scope.$parent.equipment.armor;

  });

angular.module('woin-character')
  .controller('EquipmentWeaponsCtrl', function EquipmentCtrl($scope) {

    var KEY = $scope.KEY = 'Equipment';
    if(!$scope.ship[KEY]) $scope.ship[KEY] = {};

    $scope.generalHash = $scope.$parent.generalHash;
  });

angular.module('woin-character')
  .controller('EquipmentGearCtrl', function EquipmentCtrl($scope) {

    var KEY = $scope.KEY = 'Equipment';
    if(!$scope.ship[KEY]) $scope.ship[KEY] = {};

    $scope.generalHash = $scope.$parent.generalHash;
  });

angular.module('woin-character')
  .controller('EquipmentCyberneticsCtrl', function EquipmentCtrl($scope) {

    var KEY = $scope.KEY = 'Equipment';
    if(!$scope.ship[KEY]) $scope.ship[KEY] = {};

    $scope.generalHash = $scope.$parent.generalHash;
  });

angular.module('woin-character')
  .controller('EquipmentMountsCtrl', function EquipmentCtrl($scope) {

    var KEY = $scope.KEY = 'Equipment';
    if(!$scope.ship[KEY]) $scope.ship[KEY] = {};

    $scope.generalHash = $scope.$parent.generalHash;
  });

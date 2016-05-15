
angular = require('angular');

angular.module('woin-character')
  .controller('EquipmentArmorCtrl', function EquipmentCtrl($scope) {
    $scope.armor = $scope.$parent.equipment.armor;
    var KEY = $scope.KEY = 'Armor';
  });

angular.module('woin-character')
  .controller('EquipmentWeaponsCtrl', function EquipmentCtrl($scope) {
      $scope.weapons = $scope.$parent.equipment.weapons;
    var KEY = $scope.KEY = 'Weapons';
  });

angular.module('woin-character')
  .controller('EquipmentGearCtrl', function EquipmentCtrl($scope) {
      $scope.gear = $scope.$parent.equipment.gear;

      var KEY = $scope.KEY = 'Gear';
  });

angular.module('woin-character')
  .controller('EquipmentCyberneticsCtrl', function EquipmentCtrl($scope) {
      $scope.cybernetics = $scope.$parent.equipment.cybernetics;
    console.log("Cybernetics:")
    console.log($scope.cybernetics);
      var KEY = $scope.KEY = 'Cybernetics';
  });

angular.module('woin-character')
  .controller('EquipmentMountsCtrl', function EquipmentCtrl($scope) {
      $scope.mounts = $scope.$parent.equipment.mounts;
      var KEY = $scope.KEY = 'Mounts';
  });

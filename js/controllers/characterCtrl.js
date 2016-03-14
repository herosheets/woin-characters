/*global angular */

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */
var angular = require('angular');

var flatComponents = ['hull', 'sensor', 'exploits'];

var quantityComponents = {
  'Crew': 'crewHash',
  'Control Computers': "computerHash",
  'Power Plant': "powerplantHash",
  'Sub-luminal Engine': 'sublHash',
  'FTL Engine': 'ftlHash',
  'Point Defenses': 'pointDefensesHash',
  'Deflector Shields': 'deflectorHash',
  'Superstructure': 'superstructureHash',
  'Weapon System': 'weaponHash',
  'Facilities': 'facilitiesHash',
  'Hangar Bay Shuttle': 'hangarHash',
  'Hangar Bay Fighter': 'hangarHash',
  'General': 'generalHash',
  'Cloaking': 'generalHash',
  'Exploits': 'exploitsHash',
  'Tractor Beam': 'generalHash',
  'Fueling': 'generalHash',
  'Engine Mods': 'generalHash'
};

var crewValues = ['Space', 'Cost', 'Luxury'];

var getComponentValue = function (c, val) {
  if (c !== undefined && c !== null) {
    if (_.has(c, val)) {
      return c[val];
    } else {
      return 0;
    }
  }
  return 0;
};

var getQuantityValue = function (shipPart, val, partsList) {
  var total = 0;
  if (shipPart !== undefined && shipPart !== null) {
    angular.forEach(shipPart, function (quantity, component) {
      if (_.has(partsList[component], val)) {
        var b = +(partsList[component][val]);
        if (!(isNaN(b))) {
          total += b * quantity;
        }
      }
    });
  }
  return total;
};

var getCrewValue = function (shipPart, val, partsList, crewSize) {
  try {
    if (_.contains(crewValues, val) && crewSize > 0) {
      var key = val + "/crew";
      return getQuantityValue(shipPart, key, partsList);
    } else {
      return 0;
    }
  } catch (e) {
    console.log(e);
    return 0;
  }
}

var getTotalShipValue = function (ship, valueName, scope) {
  var base = 0;
  var crewSize = getTotalCrew(ship, scope);
  angular.forEach(flatComponents, function (c) {
    base += getComponentValue(ship[c], valueName);
  });
  angular.forEach(quantityComponents, function (hashName, componentName) {
    var hash = scope[hashName];
    base += getQuantityValue(ship[componentName], valueName, hash);
    base += getCrewValue(ship[componentName], valueName, hash, crewSize);
  });
  return base;
};

var getBackupVal = function (ship, valueName, scope) {
  var hash = scope['ftlHash'];
  var componentName = 'Backup FTL Engine';
  var base = 0;
  base += getQuantityValue(ship[componentName], valueName, hash);
  return base;
};

var getAllShipValues = function (ship, valueName, scope) {
  return getTotalShipValue(ship, valueName, scope);
};

var getCost = function (ship, scope) {
  var backup = getBackupVal(ship, 'Cost', scope);
  return backup + getTotalShipValue(ship, 'Cost', scope);
};

var getSpace = function (ship, scope) {
  var backup = getBackupVal(ship, 'Space', scope);
  return backup + getTotalShipValue(ship, 'Space', scope);
};

var getSpaceMax = function (ship) {
  if (_.has(ship, 'hull')) {
    return ship.hull['Max CU'];
  } else {
    return 0;
  }
};

var getCpu = function (ship, scope) {
  var backup = getBackupVal(ship, 'CPU', scope);
  return (backup + getTotalShipValue(ship, 'CPU', scope) - getCpuMax(ship, scope));
};

var getCpuMax = function (ship, scope) {
  if (_.has(ship, 'Control Computers')) {
    var q = getQuantityValue(ship['Control Computers'], 'CPU', scope.computerHash);
    return q;
  } else {
    return 0;
  }
};

var getHullClassInteger = function (ship, hulls) {
  var index = hulls.indexOf(ship.hull);
  return index + 1;
};

var getTotalCrew = function (ship, scope) {
  try {
    var baseCrew = ship.hull.Crew;
    var totalCrew = baseCrew;
    if (_.has(ship, 'Crew')) {
      angular.forEach(ship.Crew, function(quantity, crewType) {
        console.log("Crew has " + crewType + " (x " + quantity);
        if (crewType === 'Additional Crew') {
          totalCrew += quantity;
        }
      });
    }
    var modPercent = 0;

    _.each(scope.ship['Control Computers'], function(num, key) {
      var baseString = scope.computerHash[key].Crew;
      if(!_.contains(baseString, '%')) return;
      var mod = +(baseString.split('%')[0]);
      modPercent += mod*num;
    });

    return Math.floor(totalCrew + (baseCrew*(modPercent/100)));
  } catch (e) {
    return 0;
  }
};

var tabs = [
  {heading: 'Basics', route: 'main.basics'},
  {heading: 'Careers', route: 'main.careers'},
  {heading: 'Chi', route: 'main.chi'},
  {heading: 'Exploits', route: 'main.exploits'},
  {heading: 'Homeland', route: 'main.homeland'},
  {heading: 'Hook', route: 'main.hook'},
  {heading: 'Skills', route: 'main.skills'},
  {heading: 'Origin', route: 'main.origin'},
  {heading: 'Psionics', route: 'main.psionics'},
  {heading: 'Race', route: 'main.race'},
  {heading: 'Your Character', route: 'main.character'}
];

angular.module('woin-character')
  .factory('Sidenav', ['cnOffCanvas', function(cnOffCanvas) {
    return cnOffCanvas({
      controller: 'SidenavCtrl',
      controllerAs: 'offCanvas',
      template: '<div class="off-canvas__nav"><tabs data="tabs" vertical="true" type="pills"></tabs></div>'
    })
  }])
  .controller('SidenavCtrl', ['$scope', function($scope) {
      $scope.tabs = tabs;
  }])
  .controller('characterCtrl', ['$scope', 'Components', 'Sidenav', function characterCtrl($scope, Components, Sidenav) {
    'use strict';

    // initialize data
    $scope.toggleSidenav = Sidenav.toggle;
    $scope.tabs = tabs;
    $scope.character = {
      name: "",
      description: "",
      career: [],
      skills: [],
      getSkillRanks: function(skillName) {
        var ranks = 0;
        angular.forEach(this.skills, function(s) {
          if(s.name == skillName) {
            ranks += s.rank;
          }
        });
        return ranks;
      }
    };

    Components.loadCsvData($scope);

    // helper functions for cost & cargo calculations
    $scope.totalCost = function () {
      return getCost($scope.ship, $scope);
    };

    $scope.currentSpace = function () {
      return getSpace($scope.ship, $scope);
    };

    $scope.maxSpace = function () {
      return getSpaceMax($scope.ship, $scope);
    };

    $scope.maxCpu = function () {
      return getCpuMax($scope.ship, $scope);
    };

    $scope.currentCpu = function () {
      return getCpu($scope.ship, $scope);
    };

    $scope.isHullConfigDisabled = function(config) {
      if(!config.levels) return false;
      if(config.levels && !$scope.ship.hull) return true;
      return config.levels.indexOf($scope.ship.hull.Class) === -1;
    };

    $scope.calculateSublSpeed = function (engineName, quantity) {
      var totalPower = $scope.sublHash[engineName]['Power'] * quantity;
      var hullClass = getHullClassInteger($scope.ship, $scope.hulls);

      if (totalPower !== undefined && hullClass !== undefined) {
        return totalPower/hullClass;
      } else {
        return 0;
      }
    };

    $scope.getTotalCrew = function() {
      return getTotalCrew($scope.ship, $scope);
    };

    $scope.calculateFtl = function (engineName, quantity) {
      var totalPower = $scope.ftlHash[engineName]['Power'] * quantity;
      var hullClass = getHullClassInteger($scope.ship, $scope.hulls);
      var maxFtl = getTotalShipValue($scope.ship, 'Max FTL', $scope);

      if (totalPower !== undefined && hullClass !== undefined) {
        var max = totalPower/hullClass;
        if (max <= maxFtl) {
          return max;
        } else {
          return maxFtl;
        }
      } else {
        return 0;
      }
    };

    $scope.calculateOperationalRange = function() {
      if (!$scope.ship.hull || !$scope.ship['FTL Engine']) return;
      var shipClass = Number.fromRoman($scope.ship.hull.Class);
      try {
        var engines = Object.keys($scope.ship['FTL Engine']);
        var engineName = engines[0];
        var fuelEff = $scope.ftlHash[engineName]['Fuel Eff'];
        if (fuelEff === '-') {
          return "-";
        } else {
          return Math.pow(shipClass, 3) * fuelEff;
        }
      } catch (e) {
        return "-";
      }
    };

    $scope.calculateSuperstructure = function() {
      try {
        var hullClass = getHullClassInteger($scope.ship, $scope.hulls);
        var baseSs = hullClass * 3;
        var additional = $scope.ship.Superstructure["Additional SS"];
        if (additional !== undefined) {
          baseSs += additional;
        }
        return baseSs;
      } catch(e) {
        return 0;
      }

    };

    $scope.calculateDefense = function() {
      var base = getAllShipValues($scope.ship, 'DEFENSE', $scope);
      base -=  getQuantityValue($scope.ship['Point Defenses'], 'DEFENSE', $scope.pointDefensesHash);
      return base;
    };

    $scope.calculateElectronicDefense = function() {
      try {
        var bonus = getAllShipValues($scope.ship, 'ELECTRONIC DEFENSE', $scope);
        var base = getCpu($scope.ship, $scope);
        return Math.floor((base/2) + bonus);
      } catch (e) {
        return 0;
      }

    };

    $scope.presentArmor = function() {
      var base = "";
      var ballistic = 0;
      var energy = 0;
      var hullClass = getHullClassInteger($scope.ship, $scope.hulls);
      var reactive = 0;
      var ablative = 0;

      if ($scope.ship.Superstructure !== undefined) {
        reactive = $scope.ship.Superstructure["Armor, reactive"];
        ablative = $scope.ship.Superstructure["Armor, ablative"];
      }

      if (reactive !== undefined && reactive !== 0) {
        ballistic += (reactive/hullClass);
        energy += (1.5 * reactive / hullClass);
        base += reactive + "x reactive ";
      }

      if (ablative !== undefined && ablative !== 0) {
        ballistic += (1.5 * ablative/hullClass);
        energy += (ablative / hullClass);
        base += ablative + "x ablative ";
      }

      if (base === "") {
        base = "-";
      } else {
        base += "(SOAK " + ballistic + " ballistic, " + energy + " energy.)";
      }
      return base;
    };

    $scope.presentCargo = function() {
      if ($scope.ship.hull !== undefined) {
        var initialCargo = $scope.ship.hull['Max CU'];
        var amountRemaining = $scope.maxSpace() - $scope.currentSpace();
        var tonnage = amountRemaining * 50;
        return initialCargo + " ("+amountRemaining+" available; capacity " + tonnage + " tons)";
      } else {
        return "-";
      }
    };

    $scope.presentType = function(type) {
      if (type.Traits === undefined) {
        return "None";
      } else {
        return type.Type;
      }
    };

    $scope.calculateLuxury = function() {
      var luxuryTotal = getAllShipValues($scope.ship, 'Luxury/crew', $scope);
      var crewTotal = $scope.getTotalCrew();
      var lux = (luxuryTotal / crewTotal) * 100;

      if(_.isNaN(lux)) lux = 0;

      lux = Math.round(lux * 100) / 100;
      lux = lux.toFixed(0);

      if (lux < 50) {
        return lux + "% (Spartan: -2d6)";
      } else if (lux < 90) {
        return lux + "% (Poor: -1d6)";
      } else if (lux < 150) {
        return lux + "% (Adequate: -)";
      } else if (lux < 199) {
        return lux + "% (Comfortable: +1d6)";
      } else {
        return lux + "% (Decadent: -1d6)";
      }
    };

    $scope.clearCloaking = function() {
      if(!$scope.ship.General) return;
      _.each($scope.ship.General, function(value, key) {
        if(_.findWhere($scope.systems.cloaking, {Item: key})) {
          delete $scope.ship.General[key];
        }
      });
    };

    $scope.calculateSoak = function(power, quantity) {
      var hullClass = getHullClassInteger($scope.ship, $scope.hulls);
      return parseInt(power * quantity / hullClass);
    };

    $scope.isHangar = function(itemName) {
      return ($scope.generalHash[itemName] && $scope.generalHash[itemName].hangar !== undefined);
    };

    $scope.getCrewSize = function() {
      return getTotalCrew($scope.ship, $scope);
    };

    $scope.getHangarQty = function(hangar) {
      return $scope.generalHash[hangar].Craft;
    };

    $scope.addQuantitied = function (component, key, item) {
      if (component[key] === undefined) {
        component[key] = item;
        component[key].quantity = 1;
      } else {
        component[key].quantity += 1;
      }
    };

    $scope.removeQuantitied = function (component, key) {
      if (component[key].quantity > 1) {
        component[key].quantity -= 1;
      } else {
        var index = component.indexOf(key);
        component.splice(index, 1);
      }
    };

    $scope.isEmpty = function (KEY) {
      return _.size($scope.character[KEY]) === 0;
    };

    $scope.incrementItem = function (KEY, itemKey, value) {
      if(!value) value = 1;
      if (!$scope.character[KEY][itemKey]) $scope.character[KEY][itemKey] = 0;
      $scope.character[KEY][itemKey] += value;

      if(_.isNaN($scope.character[KEY][itemKey])) $scope.character[KEY][itemKey] = 0;
    };

    // only allow one type of the item at a time
    $scope.incrementOneItem = function (KEY, itemKey) {
      var keys = Object.getOwnPropertyNames($scope.ship[KEY]);

      if (keys.length === 0 ||  (_.includes(keys, itemKey))) {
        $scope.incrementItem(KEY, itemKey);
      }
    };

    $scope.hasThisItem = function (KEY, itemKey) {
      var keys = Object.getOwnPropertyNames($scope.ship[KEY]);

      return (keys.length === 0 || (_.includes(keys, itemKey)));
    };

    $scope.decrementItem = function (KEY, itemKey, value) {
      if(!value) value = 1;
      $scope.character[KEY][itemKey] -= value;
      if ($scope.character[KEY][itemKey] <= 0 || _.isNaN($scope.character[KEY][itemKey])) delete $scope.character[KEY][itemKey];
    };

    var skillCategories = {
      scientific: ['anatomy']
    };

    $scope.meetsCriteria = function(playerData, reqString) {
      var reqs = _.compact(reqString.split(';'));

      if(reqs.length === 0) return true;

      return _.all(_.map(reqs, function(req) {
        var opts = req.split(':');
        var cat = opts[0];
        var name = opts[1];
        var val = opts[2] || 0;

        // category
        if(name.startsWith('[')) {
          name = name.substring(1, name.length-1);
          var allSkillChecks = _.map(skillCategories[name], function(name) { return playerData[cat] ? playerData[cat][name] : 0; });
          return _.any(allSkillChecks, function(val) { return val > 0; });
        }

        return playerData[cat] && playerData[cat][name] >= val;
      }));
    };

    $scope.save = function() {
      var filename = "character-"+Date.now()+".json";
      var str = JSON.stringify($scope.ship, null, 4);
      var blob = new Blob([str], {type: 'application/json'});
      var a = document.createElement('a');

      if (navigator.msSaveBlob) {
        return navigator.msSaveBlob(blob, filename);

      } else if('download' in a) {
        var url = URL.createObjectURL(blob);
        a.download = filename;
        a.href = url;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        return true;
      }
    };

    $scope.load = function(files) {
      if(!files.length) return;

      var reader = new FileReader();

      reader.onload = function() {
        var text = reader.result;
        $scope.ship = JSON.parse(text);
        _.each($scope.hulls, function(hull) {
          if(hull.Class === $scope.ship.hull.Class) {
            $scope.ship.hull = hull;
          }
        });
        $scope.$apply(); // wtf angular?
      };

      reader.readAsText(files[0], 'UTF-8');
    };

  }]);

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

var deleteFromArray = function(array, c) {
  var index = array.indexOf(c);
  array.splice(index, 1);
};

var tabs = [
  {heading: 'Basics', route: 'main.basics'},
  {heading: 'Hook', route: 'main.hook'},
  {heading: 'Race', route: 'main.race'},
  {heading: 'Homeland', route: 'main.homeland'},
  {heading: 'Origin', route: 'main.origin'},
  {heading: 'Careers', route: 'main.careers'},
  {heading: 'Skills', route: 'main.skills'},
  {heading: 'Exploits', route: 'main.exploits'},
  {heading: 'Psionics', route: 'main.psionics'},
  {heading: 'Chi', route: 'main.chi'},
  {heading: 'Equipment - Gear', route: 'main.eq-gear'},
  {heading: 'Equipment - Armor', route: 'main.eq-armor'},
  {heading: 'Equipment - Weapons', route: 'main.eq-weapons'},
  {heading: 'Equipment - Cybernetics', route: 'main.eq-cybernetics'},
  {heading: 'Equipment - Mounts & Vehicles', route: 'main.eq-mounts'},
  {heading: 'Trait', route: 'main.trait'},
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
  .controller('characterCtrl', ['$scope', '$rootScope', 'Components', 'Sidenav', function characterCtrl($scope, $rootScope, Components, Sidenav) {
    'use strict';

    // initialize data
    $scope.toggleSidenav = Sidenav.toggle;
    $scope.tabs = tabs;
    $scope.character = $rootScope.character = {
      name: "",
      description: "",
      career: [],
      skills: [],
      health: 10,
      minimumAge: 0,
      equipment: {
        Gear: {},
        Armor: {},
        Weapons: {},
        Cybernetics: {},
        mount: {}
      },
      getEquipmentCost: function() {
        var cost = 0;
        angular.forEach(_.keys(character.equipment.Gear), function(k) {
          cost = cost + $scope.gearHash[k].Cost;
        });
        angular.forEach(_.keys(character.equipment.Weapons), function(k) {
          cost = cost + $scope.weaponHash[k].Cost;
        });
        angular.forEach(_.keys(character.equipment.Cybernetics), function(k) {
          cost = cost + $scope.cyberneticHash[k].Cost;
        });
        angular.forEach(_.keys(character.equipment.Armor), function(k) {
          cost = cost + $scope.armorHash[k].Cost;
        });
        if (character.equipment.mount !== {}) {
          cost = cost + character.equipment.mount.Cost;
        }
        return cost;
      },
      getSkillRanks: function(skillName) {
        var ranks = 0;
        angular.forEach(this.skills, function(s) {
          if(s.name == skillName) {
            ranks += s.rank;
          }
        });
        return ranks;
      },
      printEquipment: function() {
        var character = this;
        var equipment = [];
        angular.forEach(_.keys(character.equipment.Gear), function(k) {
          equipment.push($scope.gearHash[k].Item + " (x" + character.equipment.Gear[k] + ")");
        });
        angular.forEach(_.keys(character.equipment.Weapons), function(k) {
          equipment.push($scope.weaponHash[k].Weapon + " (x" + character.equipment.Weapons[k] + ")");
        });
        angular.forEach(_.keys(character.equipment.Cybernetics), function(k) {
          equipment.push($scope.cyberneticHash[k].Enhancement + " (x" + character.equipment.Cybernetics[k] + ")");
        });
        angular.forEach(_.keys(character.equipment.Armor), function(k) {
          equipment.push($scope.armorHash[k].Armor + " (x" + character.equipment.Armor[k] + ") [" + $scope.armorHash[k].Category + "]");
        });
        if (character.equipment.mount !== {} && character.equipment.mount.Automobile !== undefined) {
          equipment.push(character.equipment.mount.Automobile);
        }
        return equipment;
      },
      calculateCareerXpCost: function() {
        var character = this;
        var total = 0;
        try {
          for (var i = 1; i <= character.totalCareers(); i++) {
            total = total + (10*i);
          };
          if (total < 100) {
            total = 100;
          }
          return total - 100;
        } catch(error) {
          console.log(error);
          return 0;
        }
      },
      getCareerString: function() {
        var maxCareer = { name: undefined, rank: 0};
        angular.forEach(this.careers, function(rank,career) {
          if (maxCareer.rank < rank) {
            maxCareer.rank = rank;
            maxCareer.name = career;
          }
        });
        return maxCareer.name;
      },
      calculateExploitXpCost: function(universalExploits) {
        var eachCost = (this.totalCareers() + 1) * 5; // half the cost of the next grade
        var exploitCount = universalExploits.length - 1;
        var subtotal = eachCost * exploitCount;

        console.log("Exploits at this grade cost:" + eachCost + " & " + exploitCount + " universal exploits found = " + subtotal);

        if (subtotal <= 0) {
          return 0;
        } else {
          return eachCost * exploitCount;
        }
      },
      getUniversalExploits: function() {
        var character = this;
        var exploits = [];
        angular.forEach(character.exploits, function(e) {
          if (e !== undefined) {
            if (!(
                e.Exploit === 'Aim' ||
                e.Exploit === 'Feint' ||
                $scope.isRaceExploit(e.Exploit) ||
                $scope.isCareerExploit(e.Exploit)
              )) {
              console.log("Universal exploit found:" + e.Exploit)
              exploits.push(e);
            }
          }
        });
        return exploits;
      },
      totalXpCost: function() {
        var exploits = this.getUniversalExploits();
        console.log("Exploit xp cost: " + this.calculateExploitXpCost(exploits) )
        console.log("Career xp cost: " + this.calculateCareerXpCost());
        return this.calculateExploitXpCost(exploits) + this.calculateCareerXpCost();
      },
      totalCareers: function() {
        if (this.careers === undefined || this.careers.length === 0) {
          return 0;
        } else {
          return _.reduce(_.values(this.careers), function(prev, cur) { return prev + cur; }, 0);
        }
      },
      careerGrade: function() {
        return this.totalCareers();
      },
      maxDicePool: function() {
        return this.totalCareers() + "d6";
      },
      calculateMinimumAge: function() {
        var minimumAge = {
          sixes: 0,
          mod: 0,
          diceString: function() {
            return this.sixes + "d6 +" + this.mod;
          }
        };
        var character = this;

        var addAge = function(age, str) {
          var tokens = str.split('+');
          var noplus, nod = false;
          if (tokens.length > 1) {
            age.mod += parseInt(tokens[1]);
          } else {
            noplus = true;
          }
          var tokens = str.split('d');
          if (tokens.length > 1) {
            age.sixes += parseInt(tokens[0]);
          } else {
            nod = true;
          }
          if (noplus && nod) {
            // some static string
            age.mod += parseInt(str);
          }
        };

        // TODO: actually roll these dice instead of parsing
        var addCareerAge = function(age, career) {
          if (career.Years !== undefined) {
            addAge(age, career.Years.toString());
          }
        };

        var addOriginAge = function(age, origin) {
          if (origin !== undefined) {
            addAge(age, origin.Years);
          }
        };

        angular.forEach(character.careers, function(value, key) {
          for (var i = 0; i < value; i++) {
            addCareerAge(minimumAge, $scope.careerHash[key]);
          }
        });

        if (character.origin !== undefined) {
          addOriginAge(minimumAge, $scope.character.origin);
        };

        var actualage = dice.roll(minimumAge.diceString());

        character.minimumAge = actualage;
      },
      calculateAgeRange: function() {
        var character = this;
        var min = parseInt(character.race.adult_range.split('-')[0]);
        var max = parseInt(character.race.adult_range.split('-')[1]);
        
        var hasOld = _.contains(character.exploits, $scope.exploitsHash['Old']);
        var hasYoung = _.contains(character.exploits, $scope.exploitsHash['Young']);

        if (character.age < min) {
          if(hasOld) {
            deleteFromArray(character.exploits, $scope.exploitsHash['Old'])
          }
          if (!hasYoung) {
            character.exploits.push($scope.exploitsHash['Young']);
          }
          return "Young";
        }
        if (character.age > max) {
          if(hasYoung) {
            deleteFromArray(character.exploits, $scope.exploitsHash['Young'])
          }
          if (!hasOld) {
            character.exploits.push($scope.exploitsHash['Old']);
          }
          return "Old";
        }
        if(hasOld) {
          deleteFromArray(character.exploits, $scope.exploitsHash['Old'])
        }
        if(hasYoung) {
          deleteFromArray(character.exploits, $scope.exploitsHash['Young'])
        }
        return "Adult";
      }
    };

    Components.loadCsvData($rootScope);

    $scope.isRaceExploit = function(exploit) { return _.contains($rootScope.raceExploits || [], exploit); };
    $scope.isCareerExploit = function(exploit) { return _.contains($rootScope.careerExploitStrings || [], exploit); };

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

    var getRef = function(KEY, isEquipment) {
      var ref;
      if (isEquipment) {
        ref = $scope.character.equipment[KEY];
      } else {
        if(!$scope.character[KEY]) $scope.character[KEY] = {};
        ref = $scope.character[KEY];
      }
      return ref;
    };


    $scope.incrementItem = function (KEY, itemKey, value, isEquipment) {
      var ref = getRef(KEY, isEquipment);
      if(!value) value = 1;
      if (!ref[itemKey]) ref[itemKey] = 0;
      ref[itemKey] += value;
      if(_.isNaN(ref[itemKey])) ref[itemKey] = 0;
    };

    // only allow one type of the item at a time
    $scope.incrementOneItem = function (KEY, itemKey) {
      var keys = Object.getOwnPropertyNames($scope.character[KEY]);

      if (keys.length === 0 ||  (_.includes(keys, itemKey))) {
        $scope.incrementItem(KEY, itemKey);
      }
    };

    $scope.hasThisItem = function (KEY, itemKey) {
      var keys = Object.getOwnPropertyNames($scope.character[KEY]);

      return (keys.length === 0 || (_.includes(keys, itemKey)));
    };

    $scope.decrementItem = function (KEY, itemKey, value, isEquipment) {
      var ref = getRef(KEY, isEquipment);
      if(!value) value = 1;
      ref[itemKey] -= value;
      if (ref[itemKey] <= 0 || _.isNaN(ref[itemKey])) delete ref[itemKey];
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

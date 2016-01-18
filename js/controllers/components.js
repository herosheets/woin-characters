var angular = require('angular');

angular.module('woin-character').service('Components',
    function() {
      var self = this;
      var careers = 'testempty';
      var chis = 'testempty';
      var derived_stats = 'testempty';
      var equipment = 'testempty';
      var exploits =
        "Exploit,prereq,Benefits\n"+
        "180 hammerhead,skill:piloting;attribute:agi:8;,\"A starship is rotated 180 degrees while continuing its momentum, enabling it to face and fire at pursuers.\"\n"+
        "Achilles heel ,attribute:log:5;exploit:aim:1;skill:[scientific];,\"Identifying a weakness in your target, you pay 2d6 and bypass its soak score. This exploit can only be performed once per target.\"\n"+
        "Aim,,\"This is identical to the Feint exploit, but for ranged combat; it grants +1d6 bonus to an attack roll taken in the same turn. The attack action must come immediately after the feinting action. All characters get either the aim or feint exploit for free.\"\n"+
        "Always prepared,attribute:log:8;,\"You have a brilliant tactical mind, and are always prepared. You may declare a single action which you took prior to the encounter (even if you didn't know the encounter was going to take place) which helps you in this exact scenario. This must be an action you were capable of.\"\n"+
        "Analytics,attribute:log:6;,\"Studying your target's behaviour, you notice a pattern to its actions. You grant all allies within 30' a +1d6 bonus to attack the target until the start of your next turn.\"\n"+
        "Arcane recharge,skill:meditation:,\"You can spend five minutes to recover 2d6 Magic Points once per day.\"";
      var homelands = 'testempty';
      var hooks = 'testempty';
      var magics = 'testempty';
      var origins = 'testempty';
      var psionics = 'testempty';
      var races =
        "Race,Size,Attributes,Skill Choices,Exploits\n"+
        "Ogron,Large,\"str:2,end:2\",\"carrying, hardy, bravery, intimidate\",\"Dull-witted, Smelly, Brawny, stronger with age\"\n"+
        "Spartan,Medium,\"str:1,agi:1,end:1\",\"[combat], intimidate, carousing\",\"Berserker, Redundant organs, Warlike\"\n"+
        "Felan,Medium,\"agi:2,int:1,cha:1,luc:1\",\"acrobatics, climbing, jumping, [unarmed fighting], reactions, appraisal\",\"Fast, Jumper, Land on your feet, Claws\"\n"+
        "Borian,Small,\"end:1,int:1,cha:1,rep:1\",\"carousing, hardy, [crafting], engineering, appraisal\",\"Darksight, Iron constitution\"\n"+
        "Human,Medium,\"luc:2,any:2,any:1\",\"carousing, hardy, [crafting], engineering, appraisa\",\"Varied, Explorer\"";
      var traits = 'testempty';

      self.loadCsvData = function (scope) {
        scope.careers = [];
        scope.chis = [];
        scope.derived_stats = [];
        scope.equipment = [];
        scope.exploits = [];
        scope.homelands = [];
        scope.hooks = [];
        scope.magic = [];
        scope.origins = [];
        scope.psionics = [];
        scope.races = [];
        scope.traints = [];
        scope.generalHash = {};

        var doDownload = location.hostname === 'characters.enworld.org';
        var getUrl = function (file) {
          return './character_data/' + file + '.csv';
        };

        Papa.parse(doDownload ? getUrl('careers') : careers, {
          header: true,
          download: doDownload,
          dynamicTyping: true,
          step: function (row) {
            var KEY = 'Careers';
            scope.careers.push(row.data[0]);
            scope.careerHash = {};
            _.each(scope.careers, function (item) {
              scope.careerHash[item[KEY]] = item;
            });
          },
          complete: function () {
            console.log("Caraeers Loaded");
          }
        });

        Papa.parse(doDownload ? getUrl('chis') : chis, {
          header: true,
          download: doDownload,
          dynamicTyping: true,
          step: function (row) {
            var KEY = 'Chi';
            scope.chis.push(row.data[0]);
            scope.chiHash = {};
            _.each(scope.chis, function (item) {
              scope.chiHash[item[KEY]] = item;
            });
          },
          complete: function () {
            console.log("Chi Loaded");
          }
        });

        Papa.parse(doDownload ? getUrl('derived_stats') : derived_stats, {
          header: true,
          download: doDownload,
          dynamicTyping: true,
          step: function (row) {
            var KEY = 'Derived Stats';
            scope.derived_stats.push(row.data[0]);
            scope.derived_statsHash = {};
            _.each(scope.derived_stats, function (item) {
              scope.derived_statsHash[item[KEY]] = item;
            });
          },
          complete: function () {
            console.log("Derived Stats Loaded");
          }
        });

        Papa.parse(doDownload ? getUrl('equipment') : equipment, {
          header: true,
          download: doDownload,
          dynamicTyping: true,
          step: function (row) {
            var KEY = 'Equipment'
            scope.equipment.push(row.data[0]);
            scope.equipmentHash = {};
            _.each(scope.equipment, function (item) {
              scope.equipmentHash[item[KEY]] = item;
            });
          },
          complete: function () {
            console.log("Equipment Loaded");
          }
        });

        Papa.parse(doDownload ? getUrl('exploits') : exploits, {
          header: true,
          download: doDownload,
          dynamicTyping: true,
          step: function (row) {
            scope.exploits.push(row.data[0]);
            var KEY = 'Exploit';
            scope.exploitsHash = {};
            _.each(scope.exploits, function (item) {
              scope.exploitsHash[item[KEY]] = item;
            });
          },
          complete: function () {
            console.log(scope.exploits);
            console.log("Exploits Loaded");
          }
        });

        Papa.parse(doDownload ? getUrl('traits') : traits, {
          header: true,
          download: doDownload,
          quotes: true,
          dynamicTyping: true,
          step: function (row) {
            scope.traits.push(row.data[0]);
            var KEY = 'Traits';
            scope.traitsHash = {};
            _.each(scope.traits, function (item) {
              scope.traitsHash[item[KEY]] = item;
            });
          },
          complete: function () {
            console.log("Traits Loaded");
          }
        });

        Papa.parse(doDownload ? getUrl('magic') : magics, {
          header: true,
          download: doDownload,
          quotes: true,
          dynamicTyping: true,
          step: function (row) {
            scope.magic.push(row.data[0]);
            var KEY = 'Magic';
            scope.magicHash = {};
            _.each(scope.magic, function (item) {
              scope.magicHash[item[KEY]] = item;
            });
          },
          complete: function () {
            console.log("Magic Loaded");
          }
        });

        Papa.parse(doDownload ? getUrl('origins') : origins, {
          header: true,
          download: doDownload,
          quotes: true,
          dynamicTyping: true,
          step: function (row) {
            scope.origins.push(row.data[0]);
            var KEY = 'Origin';
            scope.originHash = {};
            _.each(scope.origins, function (item) {
              scope.originHash[item[KEY]] = item;
            });
          },
          complete: function () {
            console.log("Origins Loaded");
          }
        });

        Papa.parse(doDownload ? getUrl('psionics') : psionics, {
          header: true,
          download: doDownload,
          quotes: true,
          dynamicTyping: true,
          step: function (row) {
            scope.psionics.push(row.data[0]);
            var KEY = 'Psionics';
            scope.psionicsHash = {};
            _.each(scope.psionics, function (item) {
              scope.psionicsHash[item[KEY]] = item;
            });
          },
          complete: function () {
            console.log("Psionics Loaded");
          }
        });

        Papa.parse(doDownload ? getUrl('races') : races, {
          header: true,
          download: doDownload,
          quotes: true,
          dynamicTyping: true,
          step: function (row) {
            scope.races.push(row.data[0]);
            var KEY = 'Psionics';
            scope.racesHash = {};
            _.each(scope.races, function (item) {
              scope.racesHash[item[KEY]] = item;
            });
          },
          complete: function () {
            console.log("Races Loaded");
          }
        });


      };
    });
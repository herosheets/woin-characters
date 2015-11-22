var angular = require('angular');

angular.module('woin-character').service('Components',
    function() {
      var self = this;

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
            var KEY = 'Exploits';
            scope.exploitsHash = {};
            _.each(scope.exploits, function (item) {
              scope.exploitsHash[item[KEY]] = item;
            });
          },
          complete: function () {
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

        var careers = [];

        var chis = [];

        var derived_stats = [];

        var equipment = [];

        var exploits = [];

        var homelands = [];

        var hooks = [];

        var magics = [];

        var origins = [];

        var psionics = [];

        var races = [];

        var traits = [];
      };
    });
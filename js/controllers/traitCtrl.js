
angular = require('angular');

angular.module('woin-character')
  .controller('TraitCtrl', function TraitCtrl($scope, StatCalc) {

    var KEY = $scope.KEY = 'Trait';

  console.log($scope.traitsHash)

    $scope.character[KEY] = '';

    var minStats = ['STR', 'AGI', 'END', 'INT', 'LOG', 'WIL', 'CHA'];
    var maxStats = minStats.concat(['REP']);

    var maxStatHash = {
        STR: ['Massive', 'Massive', 'Athletic', 'Athletic', 'Brawny', 'Brawny'],
        AGI: ['Nimble', 'Nimble', 'Deadeye', 'Deadeye', 'Ambidextrous', 'Ambidextrous'],
        END: ['Rugged', 'Rugged', 'Rugged', 'Tough-as-nails', 'Tough-as-nails', 'Tough-as-nails'],
        INT: ['Empathic', 'Empathic', 'Empathic', 'Alert', 'Alert', 'Alert'],
        LOG: ['Brilliant', 'Brilliant', 'Brilliant', 'Erudite', 'Erudite', 'Erudite'],
        WIL: ['Stoic', 'Stoic', 'Stoic', 'Unflappable', 'Unflappable', 'Unflappable'],
        CHA: ['Commanding', 'Inspiring', 'Suave', 'Suave', 'Persuasive', 'Persuasive'],
        REP: ['Well-known', 'Well-known', 'Well-known', 'Egotistical', 'Egotistical', 'Egotistical']
    };

    var minStatHash = {
        STR: ['Feeble', 'Feeble', 'Feeble', 'Tottering', 'Tottering', 'Tottering'],
        AGI: ['Clumsy', 'Clumsy', 'Clumsy', 'Lame', 'Lame', 'Lame'],
        END: ['Coughing', 'Coughing', 'Coughing', 'Asthmatic/anemic', 'Asthmatic/anemic', 'Asthmatic/anemic'],
        INT: ['Naive', 'Naive', 'Naive', 'Distracted', 'Distracted', 'Distracted'],
        LOG: ['Illiterate', 'Illiterate', 'Illiterate', 'Forgetful', 'Forgetful', 'Forgetful'],
        WIL: ['Alcoholic', 'Alcoholic', 'Reckless', 'Reckless', 'Spendthrift', 'Spendthrift'],
        CHA: ['Unwashed', 'Unwashed', 'Disfigured', 'Disfigured', 'Obnoxious', 'Obnoxious']
    };

    var calcStatPred = function(stat) { return StatCalc.calcStat(stat); };

    $scope.allTraits = function() {
        var maxStatNum = StatCalc.calcStat(_.max(maxStats, calcStatPred));
        var minStatNum = StatCalc.calcStat(_.min(minStats, calcStatPred));

        var maxStatsCalc = _.filter(maxStats, function(stat) { return StatCalc.calcStat(stat) === maxStatNum; });
        var minStatsCalc = _.filter(minStats, function(stat) { return StatCalc.calcStat(stat) === minStatNum; });
        
        var maxStatTraits = _.map(maxStatsCalc, function(stat) { return maxStatHash[stat][maxStatNum]; });
        var minStatTraits = _.map(minStatsCalc, function(stat) { return minStatHash[stat][maxStatNum]; });

        return maxStatTraits.concat(minStatTraits);
    };

  });
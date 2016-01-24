var angular = require('angular');

angular.module('woin-character').service('Components',
    function() {
      var self = this;
      var careers =
        "Career,Prerequisites,Attributes,Skill Choices,Description,Exploits,Years,Source\n"+
        "Academy,,\"agi:1,log:1;wil:1;cha:1\",\"carrying, pistols, rifles, leadership, law, [scientific], [technical], tactics, leadership, starship tactics\",\"You joined the military and completed basic military training. Some programs send recruits to college to gain degrees before returning to cadet assignments. The Military Academy is the basic training location for both Naval and Marine officers, and as such covers a wide curriculum along with an opportunity to specialize early in a science, medicine, or engineering career. The Military Academy is regarded as a top-quality institution, easily the equal of many highly placed universities. The Academy is a three-year course, and is widely regarded as the equivalent of a Bachelor's degree.\",\"Basic Training, Command School [requires Basic Training], Branch Specialization [requires Basic Training; one [scientific] skill, Academy Tutor (requires Basic Training), Academy Professor (Requires Academy Tutor)\",3,Future\n"+
        "Assassin,skill:stealth;skill:tracking;skill:[combat],str:1;agi:1;int:1;rep:1,\"[combat ], stealth, thievery, perception, intimidate, disguise\",\"A killer for hire, you mastered the skills of assassination.\",\"Killing Blow, Ambush, Weak Point, Sneak\",1d6,\"Modern, Future\"\n"+
        "Archer,attribute:agi:3,str:1;agi:1;luc:1;rep:1,\"bows, perception, carousing, survival\",\"You joined the army as an archer, manning walls and front lines in times of war.\",\"Long Shot, Bowyer, Careful Aim, Rapid Shot, Stand Your Ground, Double Shot, Intercepting Shot\",1d6,Archaic \n"+
        "Barbarian,,str:1;end:1;agi:1;int:1,\"swords, axes, spears, [physical], [outdoor], hardy, herbalism\",\"Tribal warriors from the very fringes of civilization, barbarians are wild and uncouth. Barbarians exemplify physical prowess and natural prowess, but can feel uncomfortable in enclosed spaces.\",\"Feet Of Foot, Mighty Leap, Set In The Old Ways, Primal Charge (requires Fleet of Foot), Hides & Skins, Leathery Skin, Iron Skin (requires Leathery Skin), Sacred Terrain, Beastly Visage, Scarred Visage (requires Beastly Visage, Leather skin), Keen Senses, Trophy Collection (requires Set In The Old Ways), Reap The Whirlwind, Feral, Natural Serenity (requires Sacred Terrain)\",1d6,Archaic \n"+
        "Private Eye,,agi:1;int:1;log:1;cha:1,\"pistols, brawling, perception, persuasion, carousing, driving, thievery, stealth\",\"You snoop, bribe, tail, and occasionally get socked a few times a month in order to pay the bills. You know all the shady spots in town.\",\"Snoop, Contacts, Great Detective, Hardboiled\",1d6,Modern \n"+
        "Driver,,agi:1;int:1;cha:1;rep:1,\"driving, perception, engineering, carousing\",,\"Getaway, Racer, Drag Racer, Evasive Driving, Shoot 'n Drive, Yee-haaa!, Defensive Driving\",1d6,Modern \n"
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
      var homelands =
        "Homeworld,Attributes,Bonus Skill\n"+
        "Agricultural,end:1;log:-1,Farming\n"+
        "Arctic,end:1;agi-1,Survival\n"+
        "Asteroid,agi:1;str-1,Zero-g or mining\n"+
        "Barren,end:1;cha-1,Survival\n"+
        "City,cha:1;end-1,Diplomacy or bureacracy\n"+
        "Desert,end:1;agi-1,Navigation or survival\n"+
        "Jungle,agi:1;end:-1,Climbing\n"+
        "Ocean,agi:1;int-1,Swimming or sailing\n"+
        "Volcanic,agi:1;str:-1,Dodging\n";
      var hooks = 'testempty';
      var magics = 'testempty';
      var origins =
        "Origin,Prerequisites,Attributes,Skill Choices,Description,Exploits,Years,Source\n"+
        "Acolyte,none,int:1;wil:1;cha:1;luc:1,\"religion, [artistic], intuition, meditation, medicine, herbalism, linguistics\",A childhood spent in a monastery taught you well for a life of piety.,Daily Worship,2d6+6,Archaic\n"+
        "Farmhand,none,str:1;end:1;luc:2,\"nature, herbalism, animal handling, farming, fishing, survival\",\"You grew up on a farm, learning how to manager crops and livestock.\",Outdoorsman,2d6+6,Archaic\n"
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

        Papa.parse(doDownload ? getUrl('homeworlds') : homelands, {
          header: true,
          download: doDownload,
          dynamicTyping: true,
          step: function (row) {
            var KEY = 'Homelands';
            scope.homelands.push(row.data[0]);
            scope.homelandHash = {};
            _.each(scope.homelands, function (item) {
              scope.homelandHash[item[KEY]] = item;
            });
          },
          complete: function () {
            console.log("Homelands Loaded");
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
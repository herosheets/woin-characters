var angular = require('angular');

angular.module('woin-character').service('Components',
    function() {
      var self = this;
      var careers =
        "Career,Prerequisites,Attributes,Skill Choices,Description,Exploits,Years,Source\n"+
        "Academy,,\"agi:1,log:1,wil:1,cha:1\",\"carrying, pistols, rifles, leadership, law, [scientific], [technical], tactics, leadership, starship tactics\",\"You joined the military and completed basic military training. Some programs send recruits to college to gain degrees before returning to cadet assignments. The Military Academy is the basic training location for both Naval and Marine officers, and as such covers a wide curriculum along with an opportunity to specialize early in a science, medicine, or engineering career. The Military Academy is regarded as a top-quality institution, easily the equal of many highly placed universities. The Academy is a three-year course, and is widely regarded as the equivalent of a Bachelor's degree.\",\"Basic Training, Command School [requires Basic Training], Branch Specialization [requires Basic Training; one [scientific] skill, Academy Tutor (requires Basic Training), Academy Professor (Requires Academy Tutor)\",3,Future\n"+
        "Assassin,skill:stealth;skill:tracking;skill:[combat],\"str:1,agi:1,int:1,rep:1\",\"[combat ], stealth, thievery, perception, intimidate, disguise\",\"A killer for hire, you mastered the skills of assassination.\",\"Killing Blow, Ambush, Weak Point, Sneak\",1d6,\"Modern, Future\"\n"+
        "Archer,attribute:agi:3,\"str:1,agi:1,luc:1,rep:1\",\"bows, perception, carousing, survival\",\"You joined the army as an archer, manning walls and front lines in times of war.\",\"Long Shot, Bowyer, Careful Aim, Rapid Shot, Stand Your Ground, Double Shot, Intercepting Shot\",1d6,Archaic\n"+
        "Barbarian,,\"str:1,end:1,agi:1,int:1\",\"swords, axes, spears, [physical], [outdoor], hardy, herbalism\",\"Tribal warriors from the very fringes of civilization, barbarians are wild and uncouth. Barbarians exemplify physical prowess and natural prowess, but can feel uncomfortable in enclosed spaces.\",\"Feet Of Foot, Mighty Leap, Set In The Old Ways, Primal Charge (requires Fleet of Foot), Hides & Skins, Leathery Skin, Iron Skin (requires Leathery Skin), Sacred Terrain, Beastly Visage, Scarred Visage (requires Beastly Visage, Leather skin), Keen Senses, Trophy Collection (requires Set In The Old Ways), Reap The Whirlwind, Feral, Natural Serenity (requires Sacred Terrain)\",1d6,Archaic"+
        "Private Eye,,\"agi:1,int:1,log:1,cha:1\",\"pistols, brawling, perception, persuasion, carousing, driving, thievery, stealth\",\"You snoop, bribe, tail, and occasionally get socked a few times a month in order to pay the bills. You know all the shady spots in town.\",\"Snoop, Contacts, Great Detective, Hardboiled\",1d6,Modern\n"+
        "Driver,,\"agi:1,int:1,cha:1,rep:1\",\"driving, perception, engineering, carousing\",,\"Getaway, Racer, Drag Racer, Evasive Driving, Shoot 'n Drive, Yee-haaa!, Defensive Driving\",1d6,Modern";
      var chis =
        "Name,Rank,Stance,Check,Range,Description\n"+
        "Granite Back,1,Hin Stance [STR],check,,Spend two actions focusing your CHI to move great weight. Carry double your capacity without any negative effects for a long duration; or you may expend this immediately by adding your CHI dice pool to your next STR check to lift one object.\n"+
        "Foot of the Mountain,2,Hin Stance [STR],attack,,\"Spend one action focusing your CHI to make an attack that sends your target flying. If you use a Knockback exploit before your next turn, you do not need to pay the cost, and the distance the target is knocked back is equal to a short range.\"\n"+
        "Hard as Rock,3,Hin Stance [STR],check,,Spend two actions focusing your CHI to become more durable to attack. Gain a SOAK score equal to your CHI attribute for a short duration.\n"+
        "Tumbling Boulder,4,Hin Stance [STR],attack,,Spend one action focusing your CHI to execute a ferocious charge. Move your SPEED and attack at the end of it. You may add your CHI dice pool to the damage roll.\n"+
        "Heart of the Mountain,5,Hin Stance [STR],check,,Spend two actions focusing your CHI to destroy any object. On your next action you gain a number of bonus attack dice equal to your CHI dice pool.\n"+
        "Focused Meditation,1,Daichin Stance [STR],check,,Spend one action focusing your CHI to meditate swiftly. Gain 1d6 bonus CHI. These CHI must be spent on Strength-based techniques.You may only do this once per day.\n"+
        "Focused Strike,2,Daichin Stance [STR],attack,,Spend one action focusing your CHI to make a momentous attack. Add your CHI dice pool to your next melee damage roll; you must make this attack before moving.\n"+
        "Infuse Weapon,3,Daichin Stance [STR],check,,\"Spend one action focusing your CHI to charge weapons with mystical precision and power. A number of weapons equal to your CHI dice pool become more accurate (+1d6 to attack), do more damage (+1d6 to damage), and double their range. Targets of these weapons do not benefit from anything less than total cover.\"\n"+
        "Strike the Soul,4,Daichin Stance [STR],check,,\"Spend one action focusing your CHI, striking beyond armor and scale, at the core of your target. Ignore SOAK equal to twice your CHI attribute for any unarmed attacks you make until the end of your next turn.\"\n"+
        "Attune,5,Daichin Stance [STR],check,,\"Spend two actions focusing your CHI, bringing your mind and body into perfect alignment. Increase your PHYSICAL DEFENSEs and MENTAL DEFENSE to the highest of these values for a short duration.\"";
      var derived_stats = 'testempty';
      var eqGear =
        "Item,Cost,Weight,Availability\n"+
        "'Adhesive, instant',30,0.1,6A\n"+
        "Backpack,4,2,2A";
      var eqArmor =
        "Armor,Category,SOAK,DEFENSE,Cost,Type,Weight,Vulnerable\n"+
        "Cloth,Archaic Armor,2,0,20,Light,8,\"Blunt, Fire\"\n"+
        "Full Plate,Archaic Armor,10,-4,2000,Heavy,70,Electricity\n"+
        "\"Small, wooden\",Shield,,+2,40,,6,\n"+
        "\"Four-mirror armor\",Eastern Armor,6,0,45,Medium,45,";
      var eqWeapons =
        "Weapon,Damage,Type,Range,Cost,Size,Weight,Availability,Special\n"+
        "\"Axe, battleaxe\",3d6,Slashing,,10,M,5,1A,\n"+
        "\"Axe, handaxe\",2d6,Slashing,,4,S,2,1A,Thrown\n"+
        "\"Club\",2d6,Blunt,,1,M,3,0A,\n"+
        "\"Bow, longbow\",2d6+2,Piercing,18,70,L,4,2A,";
      var eqCybernetics =
        "Enhancement,Type,Cost,Effect,stat,stat_bonus,skill,skill_bonus,defense,defense_bonus,attack,attack_bonus\n"+
        "Artificial Arm,Major,100000,\"+1d6 to STR dice pool\",STR,1d6,,,,,,\n"+
        "Digiclaws,Minor,100000,\"+1d6 natural damage\",,,,,,,natural,1d6\n"+
        "Durarmor/sub-dermal plating,Major,200000,\"SOAK 5\",,,,,SOAK,5,,,\n"+
        "Input jacks,Minor,50000,\"+1d6 computer operations\",,,computer operations,1d6,,,,";
      var eqMounts =
        "Automobile,Year,Cost,AdjPrice,Upgrades,Occupants,SPEED,ACCEL,HANDLING,HEALTH,SOAK,DEFENSE\n"+
        "Aston Martin DB5, 1963, 7000, 43400,10,2,14,3,C,57,5,10\n"+
        "Pontiac Firebird Trans Am, 1982,10396,44703,10,2,12,2,C,57,5,10";
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
        "Volcanic,agi:1;str:-1,Dodging";
      var origins =
        "Origin,Prerequisites,Attributes,Skill Choices,Description,Exploits,Years,Source\n"+
        "Acolyte,none,\"int:1,wil:1,cha:1,luc:1\",\"religion, [artistic], intuition, meditation, medicine, herbalism, linguistics\",A childhood spent in a monastery taught you well for a life of piety.,Daily Worship,2d6+6,Archaic\n"+
        "Farmhand,none,\"str:1,end:1,luc:2\",\"nature, herbalism, animal handling, farming, fishing, survival\",\"You grew up on a farm, learning how to manager crops and livestock.\",Outdoorsman,2d6+6,Archaic";
      var psionics =
        "Name,Category,Prereq,Description\n"+
        "Adrenalize,Biopsionics,attr:psi:4,\"You can channel positive energy into somebody, granting them a +1d6 die bonus per 4 PSI to all physical attribute checks for one minute. This process is draining, however, and causes you 1d6 psionic damage for each 1d6 bonus you grant.\"\n"+
        "Bioifeedback,Biopsionics,attr:psi:4,\"You psychically harden your skin, gaining SOAK 1 +1 per PSI until your next turn.\"\n"+
        "Psychic Healiing,Biopsionics,attr:psi:6,You can heal 1d6 per 6 PSI HEALTH by touch. Any given creature canonly benefit from this power once per day.\n"+
        "Psychic Resuscitation,Biopsionics,attr:psi:6,You may stabilize a dying creature by touch by spending two actions.\n"+
        "Hypercognition,Clairsentience,attr:psi:8,\"When you use this power, everything appears to slow down for you. For 1 round per 4 PSI, you gain an extra action each round. Using this power is a free action.\"\n"+
        "Precognition,Clairsentience,attr:psi:4,Your natural precognition gives you a +1d6 per 4 PSI bonus to INITIATIVE checks as well as checks to access the ambush turn.\n"+
        "Retrocognition,Clairsentience,attr:psi:12,You can see into the past up to 1 day per PSI until your next turn. Your view is of your current location as though you were there at the time.";
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
        scope.equipment = {
          gear: [],
          armor: [],
          weapons: [],
          mounts: [],
          cybernetics: []
        };
        scope.exploits = [];
        scope.homelands = [];
        scope.origins = [];
        scope.psionics = [];
        scope.races = [];
        scope.traints = [];
        scope.generalHash = {};
        scope.gearHash = {};
        scope.weaponHash = {};
        scope.cyberneticHash = {};

        var doDownload = location.hostname === 'characters.enworld.org';
        var getUrl = function (file) {
          return './character_data/' + file + '.csv';
        };

        Papa.parse(doDownload ? getUrl('eq-gear') : eqGear, {
          header: true,
          download: doDownload,
          dynamicTyping: true,
          step: function (row) {
            scope.equipment.gear.push(row.data[0]);
          },
          complete: function () {
            console.log("Gear Loaded");
            var KEY = 'Item';
            _.each(scope.equipment.gear, function (item) {
              scope.gearHash[item[KEY]] = item;
            });
          }
        });

        Papa.parse(doDownload ? getUrl('eq-armor') : eqArmor, {
          header: true,
          download: doDownload,
          dynamicTyping: true,
          step: function (row) {
            scope.equipment.armor.push(row.data[0]);
          },
          complete: function () {
            console.log("Armor Loaded");
          }
        });

        Papa.parse(doDownload ? getUrl('eq-cybernetics') : eqCybernetics, {
          header: true,
          download: doDownload,
          dynamicTyping: true,
          step: function (row) {
            scope.equipment.cybernetics.push(row.data[0]);
          },
          complete: function () {
            console.log("Cybernetics Loaded");
            var KEY = 'Enhancement';
            _.each(scope.equipment.cybernetics, function (item) {
              scope.cyberneticHash[item[KEY]] = item;
            });
          }
        });

        Papa.parse(doDownload ? getUrl('eq-mounts') : eqMounts, {
          header: true,
          download: doDownload,
          dynamicTyping: true,
          step: function (row) {
            scope.equipment.mounts.push(row.data[0]);
          },
          complete: function () {
            console.log("Mounts Loaded");
          }
        });

        Papa.parse(doDownload ? getUrl('eq-weapons') : eqWeapons, {
          header: true,
          download: doDownload,
          dynamicTyping: true,
          step: function (row) {
            scope.equipment.weapons.push(row.data[0]);
            var KEY = 'Weapon';
            _.each(scope.equipment.weapons, function (item) {
              scope.weaponHash[item[KEY]] = item;
            });
          },
          complete: function () {
            console.log("Weapons Loaded");
          }
        });

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
            scope.chis.push(row.data[0]);
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
            var KEY = 'Name';
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
/*global angular */

Number.fromRoman= function(roman){
	var accept = true;
	var s= roman.toUpperCase().replace(/ +/g, ''),
			L= s.length, sum= 0, i= 0, next, val,
			R={M: 1000, D: 500, C: 100, L: 50, X: 10, V: 5, I: 1},
			fromBigRoman= function(rn){
				var n= 0, x, n1, S, rx=/(\(*)([MDCLXVI]+)/g;
				while((S= rx.exec(rn))!= null){
					x= S[1].length;
					n1= Number.fromRoman(S[2]);
					if(isNaN(n1)) return NaN;
					if(x) n1*= Math.pow(1000, x);
					n+= n1;
				}
				return n;
			};
	if (/^[MDCLXVI)(]+$/.test(s)){
		if(s.indexOf('(')== 0) return fromBigRoman(s);
		while(i<L){
			val= R[s.charAt(i++)];
			next= R[s.charAt(i)] || 0;
			if(next-val>0) val*= -1;
			sum+= val;
		}
		if(accept || sum.toRoman()=== s) return sum;
	}
	return NaN;
};

var angular = require('angular');
require('../dist/templateCachePartials');

angular.module('woin-character', ['characterPartials', 'ui.bootstrap', 'ui.router', 'ui.router.tabs', 'ngFileUpload', 'cn.offCanvas'])
	.config(function ($stateProvider, $urlRouterProvider) {
		'use strict';

		$urlRouterProvider.otherwise('/basics');

		$stateProvider
			.state('main', {
				url: '/',
				templateUrl: '/partials/character-index.html'
			})
			.state('main.basics', {
				url: 'basics',
				views: {
					content: { templateUrl: '/partials/basics.html' }
				}
			})
			.state('main.race', {
				url: 'race',
				views: {
					content: { controller: 'RaceCtrl', templateUrl: '/partials/race.html' }
				}
			})
			.state('main.homeland', {
				url: 'homeland',
				views: {
					content: { controller: 'HomelandCtrl', templateUrl: '/partials/homeland.html' }
				}
			})
			.state('main.hook', {
				url: 'hook',
				views: {
					content: { templateUrl: '/partials/hook.html' }
				}
			})
			.state('main.origin', {
				url: 'origin',
				views: {
					content: { controller: 'OriginCtrl', templateUrl: '/partials/origin.html' }
				}
			})
			.state('main.careers', {
				url: 'careers',
				views: {
					content: { controller: "CareersCtrl", templateUrl: '/partials/careers.html' }
				}
			})
			.state('main.exploits', {
				url: 'exploits',
				views: {
					content: { controller: "ExploitsCtrl", templateUrl: '/partials/exploits.html' }
				}
			})
			.state('main.traits', {
				url: 'traits',
				views: {
					content: { controller: "TraitsCtrl", templateUrl: '/partials/traits.html' }
				}
			})
			.state('main.skills', {
				url: 'skills',
				views: {
					content: { controller: "SkillsCtrl", templateUrl: '/partials/skills.html' }
				}
			})
			.state('main.derived', {
				url: 'derived',
				views: {
					content: { controller: "DerivedStatsCtrl", templateUrl: '/partials/derived.html' }
				}
			})
			.state('main.eq-armor', {
				url: 'eq-armor',
				views: {
					content: { controller: "EquipmentArmorCtrl", templateUrl: '/partials/eq-armor.html' }
				}
			})
			.state('main.eq-cybernetics', {
				url: 'eq-cybernetics',
				views: {
					content: { controller: "EquipmentCyberneticsCtrl", templateUrl: '/partials/eq-cybernetics.html' }
				}
			})
			.state('main.eq-gear', {
				url: 'eq-gear',
				views: {
					content: { controller: "EquipmentGearCtrl", templateUrl: '/partials/eq-gear.html' }
				}
			})
			.state('main.eq-mounts', {
				url: 'eq-mounts',
				views: {
					content: { controller: "EquipmentMountsCtrl", templateUrl: '/partials/eq-mounts.html' }
				}
			})
			.state('main.eq-weapons', {
				url: 'eq-weapons',
				views: {
					content: { controller: "EquipmentWeaponsCtrl", templateUrl: '/partials/eq-weapons.html' }
				}
			})
			.state('main.psionics', {
				url: 'psionics',
				views: {
					content: { controller: "PsionicsCtrl", templateUrl: '/partials/psionics.html' }
				}
			})
			.state('main.chi', {
				url: 'chi',
				views: {
					content: { controller: "ChiCtrl", templateUrl: '/partials/chi.html' }
				}
			})
			.state('main.trait', {
				url: 'trait',
				views: {
					content: { controller: "TraitCtrl", templateUrl: '/partials/trait.html' }
				}
			})
			.state('main.character', {
				url: 'character',
				views: {
					content: { controller: "CharacterViewCtrl", templateUrl: '/partials/character.html' }
				}
			})
		;
	});


require('components');
require('characterCtrl');
require('characterViewCtrl');
require('raceCtrl');
require('skillsCtrl');
require('homelandCtrl');
require('originCtrl');
require('careersCtrl');
require('exploitsCtrl');
require('traitCtrl');
require('derivedCtrl');
require('equipmentCtrl');
require('psionicsCtrl');
require('chiCtrl');
require('exploitService');

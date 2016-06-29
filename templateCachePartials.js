(function(module) {
try {
  module = angular.module('characterPartials');
} catch (e) {
  module = angular.module('characterPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/partials/basics.html',
    '<h2>Basic Character Facts</h2>\n' +
    '<p class="explainer">\n' +
    '    Name your character!\n' +
    '</p>\n' +
    '\n' +
    '<div class="row display-row">\n' +
    '    <div class="col-md-3">Name</div>\n' +
    '    <div class="col-md-9">\n' +
    '        <input class="form-control" type="text" ng-model="character.name">\n' +
    '    </div>\n' +
    '</div>\n' +
    '\n' +
    '<div class="row display-row">\n' +
    '    <div class="col-md-3">Age - minimum {{ character.minimumAge }} </div>\n' +
    '    <div class="col-md-9">\n' +
    '        <input class="form-control"\n' +
    '               type="number"\n' +
    '               ng-model="character.age"\n' +
    '               min="character.minimumAge">\n' +
    '    </div>\n' +
    '    <p style="color:red;" ng-if="character.age < character.minimumAge">\n' +
    '        Please select an age greater than or equal to the minimum age.\n' +
    '    </p>\n' +
    '    <p ng-if="(character.race !== undefined && character.age !== undefined)">\n' +
    '        This age makes your character {{ character.calculateAgeRange() }}\n' +
    '    </p>\n' +
    '</div>\n' +
    '\n' +
    '<div class="row display-row margin-top-15">\n' +
    '    <div class="col-md-3">Description</div>\n' +
    '    <div class="col-md-9">\n' +
    '        <textarea class="form-control" ng-model="character.description" rows="3">\n' +
    '    </div>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('characterPartials');
} catch (e) {
  module = angular.module('characterPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/partials/careers.html',
    '<h2>Careers</h2>\n' +
    '<p class="explainer">\n' +
    '   Choose four careers\n' +
    '    <div ng-if="atMaxCareers()">Your additional careers cost {{ calculateCareerXpCost() }} XP.</div>\n' +
    '</p>\n' +
    '\n' +
    '<table class="table table-striped">\n' +
    '    <thead>\n' +
    '    <tr>\n' +
    '        <th></th>\n' +
    '        <th>Career</th>\n' +
    '        <th>Attributes</th>\n' +
    '        <th>Skill Choices</th>\n' +
    '        <th>Description</th>\n' +
    '        <th>Exploit</th>\n' +
    '        <th>Years</th>\n' +
    '    </tr>\n' +
    '    </thead>\n' +
    '    <tbody>\n' +
    '        <tr ng-repeat="careerObj in careerExploits">\n' +
    '            <td><button type="button" class="btn btn-primary" ng-click="removeCareer(name, careerObj.exploit)">-</button></td>\n' +
    '            <td>{{ careerObj.career }}</td>\n' +
    '            <td>{{ printAttributes(careerHash[careerObj.career].Attributes) }}</td>\n' +
    '            <td>{{ careerHash[careerObj.career][\'Skill Choices\'] }}</td>\n' +
    '            <td>{{ careerHash[careerObj.career].Description }}</td>\n' +
    '            <td>{{ careerObj.exploit }}</td>\n' +
    '            <td>{{ careerHash[careerObj.career].Years }}</td>\n' +
    '        </tr>\n' +
    '    </tbody>\n' +
    '</table>\n' +
    '\n' +
    '<table class="table table-striped">\n' +
    '    <thead>\n' +
    '    <tr>\n' +
    '        <th></th>\n' +
    '        <th>Career</th>\n' +
    '        <th>Attributes</th>\n' +
    '        <th>Skill Choices</th>\n' +
    '        <th>Description</th>\n' +
    '        <th>Exploits</th>\n' +
    '        <th>Years</th>\n' +
    '    </tr>\n' +
    '    </thead>\n' +
    '    <tbody>\n' +
    '        <tr ng-repeat="c in careers">\n' +
    '            <td><button type="button" class="btn btn-primary" ng-disabled="!c._currentExploit" ng-click="chooseCareer(c)">+</button></td>\n' +
    '            <td>{{ c.Career }}</td>\n' +
    '            <td>{{ printAttributes(c.Attributes) }}</td>\n' +
    '            <td>{{ c[\'Skill Choices\'] }}</td>\n' +
    '            <td>{{ c.Description }}</td>\n' +
    '            <td width="20%">\n' +
    '                <select class="form-control" ng-model="c._currentExploit" ng-options="exploit for exploit in exploitsFilteredRequirements(c)"></select>\n' +
    '            </td>\n' +
    '            <td>{{ c.Years }}</td>\n' +
    '        </tr>\n' +
    '    </tbody>\n' +
    '</table>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('characterPartials');
} catch (e) {
  module = angular.module('characterPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/partials/character-index.html',
    '<div class="row">\n' +
    '    <div class="col-md-3 hidden-sm hidden-xs">\n' +
    '        <tabs data="tabs" vertical="true" type="pills"></tabs>\n' +
    '    </div>\n' +
    '    <div class="col-md-9">\n' +
    '        <div ui-view="content"></div>\n' +
    '    </div>\n' +
    '</div>\n' +
    '\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('characterPartials');
} catch (e) {
  module = angular.module('characterPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/partials/character.html',
    '<div class="row">\n' +
    '    <div class="col-md-8">\n' +
    '        <table cols="17" frame="void" rules="none" border="0" cellspacing="0">\n' +
    '            <colgroup>\n' +
    '                <col width="86">\n' +
    '                <col width="86">\n' +
    '                <col width="86">\n' +
    '                <col width="96">\n' +
    '                <col width="86">\n' +
    '                <col width="86">\n' +
    '                <col width="86">\n' +
    '                <col width="86">\n' +
    '                <col width="86">\n' +
    '                <col width="86">\n' +
    '                <col width="86">\n' +
    '                <col width="86">\n' +
    '                <col width="86">\n' +
    '                <col width="86">\n' +
    '                <col width="86">\n' +
    '                <col width="86">\n' +
    '                <col width="86">\n' +
    '            </colgroup>\n' +
    '            <tbody>\n' +
    '            <tr>\n' +
    '                <td colspan="17" height="24" align="left" bgcolor="#dddddd" width="1467">\n' +
    '                    <b>\n' +
    '                        <font size="4">\n' +
    '                            {{ character.name }}\n' +
    '                        </font>\n' +
    '                    </b>\n' +
    '                </td>\n' +
    '            </tr>\n' +
    '            <tr>\n' +
    '                <td colspan="17" height="17" align="left" bgcolor="#dddddd">\n' +
    '                    <em>\n' +
    '                       A {{ character.hook }}\n' +
    '                    </em><br/>\n' +
    '                    <em>\n' +
    '                        <!-- what is this? -->\n' +
    '                        Small sentient humanoid (grade 5; max dice pool 5d6)\n' +
    '                    </em><br/>\n' +
    '                </td>\n' +
    '            </tr>\n' +
    '            <tr>\n' +
    '                <td colspan="17" height="17" align="left">\n' +
    '                    <span style="font-weight: bold;">STR</span> {{ getStatForCharacter(\'STR\') }} ({{ getDiceForCharacter(\'STR\') }})\n' +
    '                    <span style="font-weight: bold;">AGI</span> {{ getStatForCharacter(\'AGI\') }} ({{ getDiceForCharacter(\'AGI\') }})\n' +
    '                    <span style="font-weight: bold;">END</span> {{ getStatForCharacter(\'END\') }} ({{ getDiceForCharacter(\'END\') }})\n' +
    '                </td>\n' +
    '            </tr>\n' +
    '            <tr>\n' +
    '                <td colspan="17" height="17" align="left">\n' +
    '                    <span style="font-weight: bold;">INT</span> {{ getStatForCharacter(\'INT\') }} ({{ getDiceForCharacter(\'INT\') }})\n' +
    '                    <span style="font-weight: bold;">LOG</span> {{ getStatForCharacter(\'LOG\') }} ({{ getDiceForCharacter(\'LOG\') }})\n' +
    '                    <span style="font-weight: bold;">WIL</span> {{ getStatForCharacter(\'WIL\') }} ({{ getDiceForCharacter(\'WIL\') }})\n' +
    '                    <span style="font-weight: bold;">CHA</span> {{ getStatForCharacter(\'CHA\') }} ({{ getDiceForCharacter(\'CHA\') }})\n' +
    '                    <span style="font-weight: bold;">LUC</span> {{ getStatForCharacter(\'LUC\') }} ({{ getDiceForCharacter(\'LUC\') }})\n' +
    '                    <span style="font-weight: bold;">REP</span> {{ getStatForCharacter(\'REP\') }} ({{ getDiceForCharacter(\'REP\') }})\n' +
    '                </td>\n' +
    '            </tr>\n' +
    '            <tr>\n' +
    '                <td colspan="17" height="17" align="left" bgcolor="#dddddd"><span\n' +
    '                        style="font-weight: bold;">HEALTH</span> {{ character.derived.health }} <br\n' +
    '                       >\n' +
    '                </td>\n' +
    '            </tr>\n' +
    '            <tr>\n' +
    '                <td colspan="17" height="17" align="left" bgcolor="#dddddd">\n' +
    '                    <span style="font-weight: bold;">MELEE DEFENSE</span>  {{ calculateDefense(\'MELEE\') }}\n' +
    '                    <span style="font-weight: bold;">RANGED DEFENSE</span>  {{ calculateDefense(\'RANGED\') }}\n' +
    '                    <span style="font-weight: bold;">MENTAL DEFENSE</span>  {{ calculateDefense(\'MENTAL\') }}\n' +
    '                </td>\n' +
    '            </tr>\n' +
    '            <tr>\n' +
    '                <td colspan="17" height="17" align="left" bgcolor="#dddddd">\n' +
    '                    <span style="font-weight: bold;">SOAK</span>  {{ getSOAK() }}\n' +
    '                    <span style="font-weight: bold;">VULN</span>   {{ getVULN() }}\n' +
    '                </td>\n' +
    '            </tr>\n' +
    '            <tr>\n' +
    '                <td colspan="17" height="17" align="left"><span\n' +
    '                        style="font-weight: bold;">INITIATIVE</span> {{ getDiceForCharacter([\'INT\', \'INT\']) }}\n' +
    '                </td>\n' +
    '            </tr>\n' +
    '            <tr>\n' +
    '                <td colspan="17" height="17" align="left"><span\n' +
    '                        style="font-weight: bold;">PERCEPTION</span>  {{ calculatePerception() }}\n' +
    '                </td>\n' +
    '            </tr>\n' +
    '            <tr>\n' +
    '                <td colspan="17" height="17" align="left"><span\n' +
    '                        style="font-weight: bold;">SPEED</span>  {{ calculateSpeed() }} <span\n' +
    '                        style="font-weight: bold;">CLIMB</span> {{ calculateClimb() }} <span\n' +
    '                        style="font-weight: bold;">JUMP</span> {{ calculateJump() }}\n' +
    '                </td>\n' +
    '            </tr>\n' +
    '            <tr>\n' +
    '                <td colspan="17" height="17" align="left">\n' +
    '                    <span style="font-weight: bold;">CARRY</span>  {{ calculateCarry() }}\n' +
    '                </td>\n' +
    '            </tr>\n' +
    '            <tr>\n' +
    '                <td colspan="17" height="17" align="left" bgcolor="#dddddd">\n' +
    '                    <span style="font-weight: bold;">ACTIONS</span>  {{ calculateActions() }}\n' +
    '                </td>\n' +
    '            </tr>\n' +
    '            <tr>\n' +
    '                <td colspan="17" height="17" align="left" bgcolor="#dddddd">\n' +
    '                    <span style="font-weight: bold;">NATURAL DAMAGE</span>  {{ calculateNaturalDamage() }}\n' +
    '                </td>\n' +
    '            </tr>\n' +
    '            <tr ng-repeat="w in character.equipment.weapons">\n' +
    '                <td colspan="17" height="17" align="left" bgcolor="#dddddd">\n' +
    '                    <span style="font-weight: bold; font-style: italic;"> {{ w.name }}</span>\n' +
    '                    {{ w.damage }}\n' +
    '                    5d6 (1d6+2 slashing damage)\n' +
    '                </td>\n' +
    '            </tr>\n' +
    '            <tr>\n' +
    '                <td colspan="17" height="17" align="left">\n' +
    '                    <span style="font-weight: bold;">Skills</span>\n' +
    '                    <span ng-repeat="s in character.skills" style="font-style: italic;">\n' +
    '                        <em>{{ s.name }}</em> ( {{ s.dicePool() }} ),\n' +
    '                    </span>\n' +
    '                </td>\n' +
    '            </tr>\n' +
    '            <tr>\n' +
    '                <td colspan="17" height="17" align="left">\n' +
    '                    <span style="font-weight: bold;">Gear</span>\n' +
    '                    <ul ng-repeat="e in character.printEquipment()">\n' +
    '                        <li>{{ e }}</li>\n' +
    '                    </ul>\n' +
    '                </td>\n' +
    '            </tr>\n' +
    '            <tr>\n' +
    '                <td colspan="17" height="17" align="left" >\n' +
    '                    <span style="font-weight: bold;">EXPLOITS</span><br/>\n' +
    '                    <span ng-repeat="e in character.exploits">\n' +
    '                        <strong>{{ e.Exploit }}.</strong> {{ e.Benefits }}<br/>\n' +
    '                    </span>\n' +
    '                </td>\n' +
    '            </tr>\n' +
    '            </tbody>\n' +
    '        </table>\n' +
    '       \n' +
    '        <div class="well">\n' +
    '            <p>{{ character.description }}</p>\n' +
    '            <p><strong>Careers. </strong>{{ printCareers() }} <strong>Age </strong>{{ character.age }} ({{ character.calculateAgeRange()}})</p>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('characterPartials');
} catch (e) {
  module = angular.module('characterPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/partials/chi.html',
    '<h2>Chi</h2>\n' +
    '<p class="explainer">\n' +
    '    Chi does chi things.\n' +
    '<h3>Your Chi</h3>\n' +
    '<table class="table table-striped">\n' +
    '    <thead>\n' +
    '    <tr>\n' +
    '        <th></th>\n' +
    '        <th>Name</th>\n' +
    '        <th>Rank</th>\n' +
    '        <th>Description</th>\n' +
    '    </tr>\n' +
    '    </thead>\n' +
    '    <tbody>\n' +
    '    <tr ng-if="isEmpty(KEY)">\n' +
    '        <td colspan="5" class="text-center">No chi selected.</td>\n' +
    '    </tr>\n' +
    '    </tbody>\n' +
    '    <tbody ng-repeat="(chi, chiData) in character.Chi" ng-if="chiData.length > 0">\n' +
    '    <tr><td colspan="5" class="text-center"><strong>{{chi}}</strong></td></tr>\n' +
    '    <tr ng-repeat="c in chiData">\n' +
    '        <td><button type="button" class="btn btn-primary"\n' +
    '                    ng-disabled="$index !== character.Chi[chi].length-1"\n' +
    '                    ng-click="unselectChi(chi, c)">Remove</button></td>\n' +
    '        <td>{{c.Name}}</td>\n' +
    '        <td>{{c.Rank}}</td>\n' +
    '        <td>{{c.Description}}</td>\n' +
    '    </tr>\n' +
    '    </tbody>\n' +
    '</table>\n' +
    '<table class="table table-striped">\n' +
    '    <thead>\n' +
    '    <tr colspan="5">\n' +
    '        <th></th>\n' +
    '        <th>Name</th>\n' +
    '        <th>Rank</th>\n' +
    '        <th>Description</th>\n' +
    '    </tr>\n' +
    '    </thead>\n' +
    '    <tbody ng-repeat="(chi, chiData) in groupedChi">\n' +
    '    <tr><td colspan="5" class="text-center"><strong>{{chi}}</strong></td></tr>\n' +
    '    <tr ng-repeat="c in chiData">\n' +
    '        <td><button type="button" class="btn btn-primary"\n' +
    '                    ng-disabled="$index !== character.Chi[chi].length || currentChi === maxChi"\n' +
    '                    ng-click="selectChi(chi, c)">Choose</button></td>\n' +
    '        <td>{{c.Name}}</td>\n' +
    '        <td>{{c.Rank}}</td>\n' +
    '        <td>{{c.Description}}</td>\n' +
    '    </tr>\n' +
    '    </tbody>\n' +
    '</table>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('characterPartials');
} catch (e) {
  module = angular.module('characterPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/partials/crew.html',
    '<h2>Troops & Passengers</h2>\n' +
    '<p class="explainer">\n' +
    '    In addition to the crew, a ship can carry troops (military personnel of various kinds). Troops add to the crew\n' +
    '    complement for the purposes of calculating LUXURY (see below), and each uses 2 CU of cargo space.\n' +
    '\n' +
    '    Passenger capacity also uses cargo space. Standard passengers use 2 CU each, while Luxury passengers use 4 CU. As\n' +
    '    with troops, passengers add to the crew complement for the purposes of calculating LUXURY.<br><br>\n' +
    '    Your minimum crew is already set by your hull class and control computer.  Additional crew can be used to supplement this minimum value, and are useful if the ship takes casualties.  Vessels which fall below minimum crew through casualties start to suffer penalties, so it is always advisable to carry more than the absolute minimum.</p>\n' +
    '\n' +
    '<h3>Your Crew</h3>\n' +
    '<table class="table table-striped">\n' +
    '    <thead>\n' +
    '    <tr>\n' +
    '        <th></th>\n' +
    '        <th>Quantity</th>\n' +
    '        <th>Type</th>\n' +
    '        <th>Space</th>\n' +
    '        <th>Cost</th>\n' +
    '    </tr>\n' +
    '    </thead>\n' +
    '    <tbody>\n' +
    '    <tr ng-repeat="(name, count) in ship[\'Crew\']">\n' +
    '        <td>\n' +
    '            <div class="input-group">\n' +
    '                <input type="number" class="form-control small-input" ng-init="crewValueRemoveHash[name] = 1" ng-model="crewValueRemoveHash[name]" />\n' +
    '                <button type="button" class="input-group-addon btn btn-primary" ng-click="decrementItem(KEY, name, crewValueRemoveHash[name])">-</button>\n' +
    '            </div>\n' +
    '        </td>\n' +
    '        <td ng-bind="count"></td>\n' +
    '        <td ng-bind="name"></td>\n' +
    '        <td ng-bind="crewHash[name].Space"></td>\n' +
    '        <td ng-bind="crewHash[name].Cost"></td>\n' +
    '    </tr>\n' +
    '    <tr ng-if="isEmpty(KEY)">\n' +
    '        <td colspan="13" class="text-center">No crew selected.</td>\n' +
    '    </tr>\n' +
    '    </tbody>\n' +
    '</table>\n' +
    '\n' +
    '<table class="table table-striped">\n' +
    '    <thead>\n' +
    '    <tr>\n' +
    '        <th>Select</th>\n' +
    '        <th>Type</th>\n' +
    '        <th>Space</th>\n' +
    '        <th>Cost</th>\n' +
    '    </tr>\n' +
    '    </thead>\n' +
    '    <tbody>\n' +
    '    <tr ng-repeat="p in passengerOptions">\n' +
    '        <td>\n' +
    '            <div class="input-group">\n' +
    '                <input type="number" class="form-control small-input" ng-init="crewValueAddHash[p.Type] = 1" ng-model="crewValueAddHash[p.Type]" />\n' +
    '                <button type="button" class="input-group-addon btn btn-primary" ng-click="incrementItem(KEY, p.Type, crewValueAddHash[p.Type])">+</button>\n' +
    '            </div>\n' +
    '        </td>\n' +
    '        <td ng-bind="p.Type"></td>\n' +
    '        <td ng-bind="p.Space"></td>\n' +
    '        <td ng-bind="p.Cost"></td>\n' +
    '    </tr>\n' +
    '    </tbody>\n' +
    '</table>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('characterPartials');
} catch (e) {
  module = angular.module('characterPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/partials/derived.html',
    '<h2>Control Computers + Power Plants</h2>\n' +
    '<p class="explainer">\n' +
    '\n' +
    '    Vessels require a <b>control computer</b> and a <b>power\n' +
    'plant</b>. Both grant CPU. CPU is a resource budget which determine the vessel\'s capacity to handle components. While named CPU by default, this resource can be freely renamed to any other core capacity resource. Examples include Power, or even Psionic Energy or Magic, depending on the campaign setting. This Builder allows the total resource budget to be built from any combination of computers and power plants, but setting-specific factors may restrict this.<br>\n' +
    '<br>\n' +
    'Nearly every function on a vessel interacts in some way with the\n' +
    'computer. The computers, sensors, and engineering facilities on a\n' +
    'starship make a up a large part of its efficiency and effectiveness.\n' +
    '&nbsp;A ship\'s computer system is able to perform faster-than-light\n' +
    'calculations for FTL travel, and ties directly into the sensor array.\n' +
    'Data storage in a ship\'s computer is so efficient that the concept of\n' +
    'storage capacity does not factor into computer design any more. Some\n' +
    'computer systems have a basic AI, while others do not.<br>\n' +
    '<br>\n' +
    'Items marked with an asterisk (*) are AL 10 items; they are only\n' +
    'available in AL 10 settings. These items can drastically change the\n' +
    'nature of a setting, especially in terms of FTL speeds.<br>\n' +
    '<br>\n' +
    'There are different approaches to computer integration and design; the starship designer should choose one. Navigation computers (navcomps or astrogation units)\n' +
    'are an AL 10 technology which allow for vastly higher FTL speeds, but do not take on the processing roles that other computer systems do. Navcomps also\n' +
    'maintain detailed navigational charts of the fastest travel routes,\n' +
    'which are not necessarily in straight\n' +
    'lines when dealing with hyperspace, intense gravity wells, dark energy\n' +
    'fluctuations, and non-euclidian\n' +
    'geometry. The introduction of navcomps makes galaxy-wide travel a\n' +
    'trivial issue. \n' +
    '<br>\n' +
    '\n' +
    '</p> \n' +
    '<h3>Your Computers</h3>\n' +
    '<table class="table table-striped">\n' +
    '    <thead>\n' +
    '    <tr>\n' +
    '        <th></th>\n' +
    '        <th>Quantity</th>\n' +
    '        <th>Computers + Power</th>\n' +
    '        <th>Cost</th>\n' +
    '        <th>Size</th>\n' +
    '        <th>Space</th>\n' +
    '        <th>Max FTL</th>\n' +
    '        <th>Max CPU</th>\n' +
    '        <th>Crew</th>\n' +
    '        <th>Rng Inc</th>\n' +
    '        <th>SOAK</th>\n' +
    '        <th>DEFENSE</th>\n' +
    '        <th>Checks</th>\n' +
    '    </tr>\n' +
    '    </thead>\n' +
    '    <tbody>\n' +
    '    <tr ng-repeat="(name, count) in ship[\'Control Computers\']">\n' +
    '        <td><button type="button" class="btn btn-primary" ng-click="decrementItem(KEY, name)">-</button></td>\n' +
    '        <td ng-bind="count"></td>\n' +
    '        <td ng-bind="name"></td>\n' +
    '        <td ng-bind="computerHash[name].Cost"></td>\n' +
    '        <td ng-bind="computerHash[name].Size"></td>\n' +
    '        <td ng-bind="computerHash[name].Space"></td>\n' +
    '        <td ng-bind="computerHash[name][\'Max FTL\']"></td>\n' +
    '        <td ng-bind="computerHash[name][\'CPU\']"></td>\n' +
    '        <td ng-bind="computerHash[name].Crew"></td>\n' +
    '        <td ng-bind="computerHash[name][\'Rng Inc\']"></td>\n' +
    '        <td ng-bind="computerHash[name].SOAK"></td>\n' +
    '        <td ng-bind="computerHash[name].DEFENSE"></td>\n' +
    '        <td ng-bind="computerHash[name].Checks"></td>\n' +
    '    </tr>\n' +
    '    <tr ng-if="isEmpty(KEY)">\n' +
    '        <td colspan="13" class="text-center">No control computers selected.</td>\n' +
    '    </tr>\n' +
    '    </tbody>\n' +
    '</table>\n' +
    '\n' +
    '<table class="table table-striped">\n' +
    '    <thead>\n' +
    '    <tr>\n' +
    '        <th></th>\n' +
    '        <th>Computers + Power</th>\n' +
    '        <th>Cost</th>\n' +
    '        <th>Size</th>\n' +
    '        <th>Space</th>\n' +
    '        <th>Max FTL</th>\n' +
    '        <th>Max CPU</th>\n' +
    '        <th>Crew</th>\n' +
    '        <th>Rng Inc</th>\n' +
    '        <th>SOAK</th>\n' +
    '        <th>DEFENSE</th>\n' +
    '        <th>Checks</th>\n' +
    '    </tr>\n' +
    '    </thead>\n' +
    '    <tbody>\n' +
    '    <tr ng-repeat="c in computers">\n' +
    '        <td><button type="button" class="btn btn-primary" ng-click="incrementItem(KEY, c[\'Control Computers\'])">+</button></td>\n' +
    '        <td ng-bind="c[\'Control Computers\']"></td>\n' +
    '        <td ng-bind="c.Cost"></td>\n' +
    '        <td ng-bind="c.Size"></td>\n' +
    '        <td ng-bind="c.Space"></td>\n' +
    '        <td ng-bind="c[\'Max FTL\']"></td>\n' +
    '        <td ng-bind="c[\'CPU\']"></td>\n' +
    '        <td ng-bind="c.Crew"></td>\n' +
    '        <td ng-bind="c[\'Rng Inc\']"></td>\n' +
    '        <td ng-bind="c.SOAK"></td>\n' +
    '        <td ng-bind="c.DEFENSE"></td>\n' +
    '        <td ng-bind="c.Checks"></td>\n' +
    '    </tr>\n' +
    '    </tbody>\n' +
    '</table>\n' +
    '\n' +
    '    Status API Training Shop Blog About Pricing \n' +
    '\n' +
    '    © 2015 GitHub, Inc. Terms Privacy Security Contact Help \n' +
    '\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('characterPartials');
} catch (e) {
  module = angular.module('characterPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/partials/eq-armor.html',
    '<h2>Equipment - Armor\n' +
    '</h2>\n' +
    '<p class="explainer">\n' +
    '   Choose your armor\n' +
    '</p>\n' +
    '\n' +
    '<h3>Your Armor</h3>\n' +
    '<table class="table table-striped">\n' +
    '    <thead>\n' +
    '    <tr>\n' +
    '        <th></th>\n' +
    '        <th>Name</th>\n' +
    '        <th>Count</th>\n' +
    '        <th>Category</th>\n' +
    '        <th>SOAK</th>\n' +
    '        <th>DEFENSE</th>\n' +
    '        <th>Cost</th>\n' +
    '        <th>Type</th>\n' +
    '        <th>Weight</th>\n' +
    '        <th>Vulnerable</th>\n' +
    '    </tr>\n' +
    '    </thead>\n' +
    '    <tbody>\n' +
    '    <tr ng-repeat="(name, count) in character.equipment[KEY]">\n' +
    '        <td><button type="button" class="btn btn-primary" ng-click="decrementItem(KEY, name, 1, true)">-</button></td>\n' +
    '        <td>{{ name }}</td>\n' +
    '        <td>{{ count }}</td>\n' +
    '        <td>{{armorHash[name].Category}}</td>\n' +
    '        <td>{{armorHash[name].SOAK}}</td>\n' +
    '        <td>{{armorHash[name].DEFENSE}}</td>\n' +
    '        <td>{{armorHash[name].Cost}} gp</td>\n' +
    '        <td>{{armorHash[name].Type}} </td>\n' +
    '        <td>{{armorHash[name].Weight}} lbs</td>\n' +
    '        <td>{{armorHash[name].Vulnerable}}</td>\n' +
    '    </tr>\n' +
    '    </tbody>\n' +
    '</table>\n' +
    '\n' +
    '<table class="table table-striped">\n' +
    '    <thead>\n' +
    '    <tr>\n' +
    '        <th></th>\n' +
    '        <th>Name</th>\n' +
    '        <th>Category</th>\n' +
    '        <th>SOAK</th>\n' +
    '        <th>DEFENSE</th>\n' +
    '        <th>Cost</th>\n' +
    '        <th>Type</th>\n' +
    '        <th>Weight</th>\n' +
    '        <th>Vulnerable</th>\n' +
    '    </tr>\n' +
    '    </thead>\n' +
    '    <tbody>\n' +
    '    <tr ng-repeat="item in armor">\n' +
    '        <td><button type="button" class="btn btn-primary" ng-click="incrementItem(KEY, item.Armor, 1, true)">+</button></td>\n' +
    '        <td>{{item.Armor}}</td>\n' +
    '        <td>{{item.Category}}</td>\n' +
    '        <td>{{item.SOAK}}</td>\n' +
    '        <td>{{item.DEFENSE}}</td>\n' +
    '        <td>{{item.Cost}} gp</td>\n' +
    '        <td>{{item.Type}} </td>\n' +
    '        <td>{{item.Weight}} lbs</td>\n' +
    '        <td>{{item.Vulnerable}}</td>\n' +
    '    </tr>\n' +
    '    </tbody>\n' +
    '</table>');
}]);
})();

(function(module) {
try {
  module = angular.module('characterPartials');
} catch (e) {
  module = angular.module('characterPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/partials/eq-cybernetics.html',
    '<h2>Equipment - Cybernetics\n' +
    '</h2>\n' +
    '<p class="explainer">\n' +
    '    Choose your cybernetics\n' +
    '</p>\n' +
    '\n' +
    '<h3>Your Cybernetics</h3>\n' +
    '<table class="table table-striped">\n' +
    '    <thead>\n' +
    '    <tr>\n' +
    '        <th></th>\n' +
    '        <th></th>\n' +
    '        <th>Name</th>\n' +
    '        <th>Type</th>\n' +
    '        <th>Cost</th>\n' +
    '        <th>Effect</th>\n' +
    '    </thead>\n' +
    '    <tbody>\n' +
    '    <tr ng-repeat="(name, count) in character.equipment[KEY]">\n' +
    '        <td><button type="button" class="btn btn-primary" ng-click="decrementItem(KEY, name, 1, true)">-</button></td>\n' +
    '        <td>{{count}}</td>\n' +
    '        <td>{{name}}</td>\n' +
    '        <td>{{cyberneticHash[name].Type}}</td>\n' +
    '        <td>{{cyberneticHash[name].Cost}} gp</td>\n' +
    '        <td>{{cyberneticHash[name].Effect}}</td>\n' +
    '    </tr>\n' +
    '    <tr ng-if="isEmpty(KEY)">\n' +
    '        <td colspan="6" class="text-center">No cybernetics selected</td>\n' +
    '    </tr>\n' +
    '    </tbody>\n' +
    '</table>\n' +
    '\n' +
    '<h3>Choose Cybernetics</h3>\n' +
    '<table class="table table-striped">\n' +
    '    <thead>\n' +
    '    <tr>\n' +
    '        <th></th>\n' +
    '        <th>Name</th>\n' +
    '        <th>Type</th>\n' +
    '        <th>Cost</th>\n' +
    '        <th>Effect</th>\n' +
    '    </tr>\n' +
    '    </thead>\n' +
    '    <tbody>\n' +
    '    <tr ng-repeat="item in cybernetics">\n' +
    '        <td><button type="button" class="btn btn-primary" ng-click="incrementItem(KEY, item.Enhancement, 1, true)">+</button></td>\n' +
    '        <td>{{item.Enhancement}}</td>\n' +
    '        <td>{{item.Type}}</td>\n' +
    '        <td>{{item.Cost}} gp</td>\n' +
    '        <td>{{item.Effect}}</td>\n' +
    '    </tr>\n' +
    '    </tbody>\n' +
    '</table>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('characterPartials');
} catch (e) {
  module = angular.module('characterPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/partials/eq-gear.html',
    '<h2>Equipment - Gear\n' +
    '</h2>\n' +
    '<p class="explainer">\n' +
    '    Choose your gear\n' +
    '</p>\n' +
    '\n' +
    '<h3>Your Gear</h3>\n' +
    '<table class="table table-striped">\n' +
    '    <thead>\n' +
    '    <tr>\n' +
    '        <th></th>\n' +
    '        <th></th>\n' +
    '        <th>Name</th>\n' +
    '        <th>Cost</th>\n' +
    '        <th>Weight</th>\n' +
    '        <th>Availability</th>\n' +
    '    </tr>\n' +
    '    </thead>\n' +
    '    <tbody>\n' +
    '    <tr ng-repeat="(name, count) in character.equipment[KEY]">\n' +
    '        <td><button type="button" class="btn btn-primary" ng-click="decrementItem(KEY, name, 1, true)">-</button></td>\n' +
    '        <td>{{count}}</td>\n' +
    '        <td>{{name}}</td>\n' +
    '        <td>{{gearHash[name].Cost}} gp</td>\n' +
    '        <td>{{gearHash[name].Weight}} lbs</td>\n' +
    '        <td>{{gearHash[name].Availability}}</td>\n' +
    '    </tr>\n' +
    '    <tr ng-if="isEmpty(KEY)">\n' +
    '        <td colspan="6" class="text-center">No gear selected</td>\n' +
    '    </tr>\n' +
    '    </tbody>\n' +
    '</table>\n' +
    '\n' +
    '<h3>Choose Gear</h3>\n' +
    '<table class="table table-striped">\n' +
    '    <thead>\n' +
    '    <tr>\n' +
    '        <th></th>\n' +
    '        <th>Name</th>\n' +
    '        <th>Cost</th>\n' +
    '        <th>Weight</th>\n' +
    '        <th>Availability</th>\n' +
    '    </tr>\n' +
    '    </thead>\n' +
    '    <tbody>\n' +
    '    <tr ng-repeat="item in gear">\n' +
    '        <td><button type="button" class="btn btn-primary" ng-click="incrementItem(KEY, item.Item, 1, true)">+</button></td>\n' +
    '        <td>{{item.Item}}</td>\n' +
    '        <td>{{item.Cost}} gp</td>\n' +
    '        <td>{{item.Weight}} lbs</td>\n' +
    '        <td>{{item.Availability}}</td>\n' +
    '    </tr>\n' +
    '    </tbody>\n' +
    '</table>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('characterPartials');
} catch (e) {
  module = angular.module('characterPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/partials/eq-mounts.html',
    '<h2>Equipment - Mounts\n' +
    '</h2>\n' +
    '<p class="explainer">\n' +
    '    Choose your mount\n' +
    '</p>\n' +
    '<table class="table table-striped">\n' +
    '    <thead>\n' +
    '    <tr>\n' +
    '        <th></th>\n' +
    '        <th>Name</th>\n' +
    '        <th>Year</th>\n' +
    '        <th>Cost</th>\n' +
    '        <th>Adjusted Price</th>\n' +
    '        <th>Upgrades</th>\n' +
    '        <th>Occupants</th>\n' +
    '        <th>SPEED</th>\n' +
    '        <th>ACCEL</th>\n' +
    '        <th>HANDLING</th>\n' +
    '        <th>HEALTH</th>\n' +
    '        <th>SOAK</th>\n' +
    '        <th>DEFENSE</th>\n' +
    '    </tr>\n' +
    '    </thead>\n' +
    '    <tbody>\n' +
    '    <tr ng-repeat="item in mounts">\n' +
    '        <td><input type="radio" ng-value="item" ng-model="character.equipment.mount"></td>\n' +
    '        <td>{{item.Automobile}}</td>\n' +
    '        <td>{{item.Year}}</td>\n' +
    '        <td>{{item.Cost}}</td>\n' +
    '        <td>{{item.AdjPrice}}</td>\n' +
    '        <td>{{item.Upgrades}} gp</td>\n' +
    '        <td>{{item.Occupants}} </td>\n' +
    '        <td>{{item.SPEED}} lbs</td>\n' +
    '        <td>{{item.ACCEL}}</td>\n' +
    '        <td>{{item.HANDLING}}</td>\n' +
    '        <td>{{item.HEALTH}}</td>\n' +
    '        <td>{{item.SOAK}}</td>\n' +
    '        <td>{{item.DEFENSE}}</td>\n' +
    '    </tr>\n' +
    '    </tbody>\n' +
    '</table>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('characterPartials');
} catch (e) {
  module = angular.module('characterPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/partials/eq-weapons.html',
    '<h2>Equipment - Weapons\n' +
    '</h2>\n' +
    '<p class="explainer">\n' +
    '    Choose your weapons\n' +
    '</p>\n' +
    '\n' +
    '<h3>Your Weapons</h3>\n' +
    '<table class="table table-striped">\n' +
    '    <thead>\n' +
    '    <tr>\n' +
    '        <th></th>\n' +
    '        <th>Name</th>\n' +
    '        <th>Count</th>\n' +
    '        <th>Damage</th>\n' +
    '        <th>Type</th>\n' +
    '        <th>Range</th>\n' +
    '        <th>Cost</th>\n' +
    '        <th>Size</th>\n' +
    '        <th>Weight</th>\n' +
    '        <th>Availability</th>\n' +
    '        <th>Special</th>\n' +
    '    </tr>\n' +
    '    </thead>\n' +
    '    <tbody>\n' +
    '    <tr ng-repeat="(name, count) in character.equipment[KEY]">\n' +
    '        <td><button type="button" class="btn btn-primary" ng-click="decrementItem(KEY, name, 1, true)">-</button></td>\n' +
    '        <td>{{name}}</td>\n' +
    '        <td>{{count}}</td>\n' +
    '        <td>{{weaponHash[name].Damage}}</td>\n' +
    '        <td>{{weaponHash[name].Type}}</td>\n' +
    '        <td>{{weaponHash[name].Range}}</td>\n' +
    '        <td>{{weaponHash[name].Cost}} gp</td>\n' +
    '        <td>{{weaponHash[name].Size}} </td>\n' +
    '        <td>{{weaponHash[name].Weight}} lbs</td>\n' +
    '        <td>{{weaponHash[name].Availability}}</td>\n' +
    '        <td>{{weaponHash[name].Special}}</td>\n' +
    '    </tr>\n' +
    '    <tr ng-if="isEmpty(KEY)">\n' +
    '        <td colspan="6" class="text-center">No weapons selected</td>\n' +
    '    </tr>\n' +
    '    </tbody>\n' +
    '</table>\n' +
    '\n' +
    '<table class="table table-striped">\n' +
    '    <thead>\n' +
    '    <tr>\n' +
    '        <th></th>\n' +
    '        <th>Name</th>\n' +
    '        <th>Damage</th>\n' +
    '        <th>Type</th>\n' +
    '        <th>Range</th>\n' +
    '        <th>Cost</th>\n' +
    '        <th>Size</th>\n' +
    '        <th>Weight</th>\n' +
    '        <th>Availability</th>\n' +
    '        <th>Special</th>\n' +
    '    </tr>\n' +
    '    </thead>\n' +
    '    <tbody>\n' +
    '    <tr ng-repeat="item in weapons">\n' +
    '        <td><button type="button" class="btn btn-primary" ng-click="incrementItem(KEY, item.Weapon, 1, true)">+</button></td>\n' +
    '        <td>{{item.Weapon}}</td>\n' +
    '        <td>{{item.Damage}}</td>\n' +
    '        <td>{{item.Type}}</td>\n' +
    '        <td>{{item.Range}}</td>\n' +
    '        <td>{{item.Cost}} gp</td>\n' +
    '        <td>{{item.Size}} </td>\n' +
    '        <td>{{item.Weight}} lbs</td>\n' +
    '        <td>{{item.Availability}}</td>\n' +
    '        <td>{{item.Special}}</td>\n' +
    '    </tr>\n' +
    '    </tbody>\n' +
    '</table>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('characterPartials');
} catch (e) {
  module = angular.module('characterPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/partials/exploits.html',
    '<h2>Exploits</h2>\n' +
    '<p class="explainer">\n' +
    '    Exploits are exploitable.\n' +
    '</p>\n' +
    '\n' +
    '<h3>Aim or Feint</h3>\n' +
    '<p class="explainer">\n' +
    '    Please choose either Aim or Feint: <div class="btn-group">\n' +
    '    <button type="button" class="btn btn-primary" ng-click="chooseAimOrFeint(\'Aim\', \'Feint\')">Aim</button>\n' +
    '    <button type="button" class="btn btn-primary" ng-click="chooseAimOrFeint(\'Feint\', \'Aim\')">Feint</button>\n' +
    '</div>\n' +
    '</p>\n' +
    '\n' +
    '<h3>Your Exploits</h3>\n' +
    '<table class="table table-striped">\n' +
    '    <thead>\n' +
    '    <tr>\n' +
    '        <th></th>\n' +
    '        <th>Name</th>\n' +
    '        <th>Benefits</th>\n' +
    '    </tr>\n' +
    '    </thead>\n' +
    '    <tbody>\n' +
    '    <tr ng-repeat="c in character.exploits">\n' +
    '        <td><button type="button" class="btn btn-primary" ng-click="removeItem(c)" ng-disabled="isRaceExploit(c.Exploit) || isCareerExploit(c.Exploit)">Remove</button></td>\n' +
    '        <td ng-bind="c.Exploit"></td>\n' +
    '        <td>{{c.Benefits}}</td>\n' +
    '    </tr>\n' +
    '    <tr ng-if="isEmpty(KEY)">\n' +
    '        <td colspan="7" class="text-center">No exploits selected.</td>\n' +
    '    </tr>\n' +
    '    </tbody>\n' +
    '</table>\n' +
    '<table class="table table-striped">\n' +
    '    <thead>\n' +
    '    <tr colspan="7">\n' +
    '        <th></th>\n' +
    '        <th>Name</th>\n' +
    '        <th>Benefits</th>\n' +
    '    </tr>\n' +
    '    </thead>\n' +
    '    <tbody>\n' +
    '    <tr ng-repeat="c in localExploits | isUniversalExploit | meetsPrerequisites:character">\n' +
    '        <td><button type="button" class="btn btn-primary" ng-click="addItem(c)" ng-disabled="!canAddMoreItems() || !canChoose(c)">Add</button></td>\n' +
    '        <td>{{c.Exploit}}</td>\n' +
    '        <td>{{c.Benefits}}</td>\n' +
    '    </tr>\n' +
    '    </tbody>\n' +
    '</table>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('characterPartials');
} catch (e) {
  module = angular.module('characterPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/partials/footer.html',
    '<footer id="footer" ng-show="todos.length" ng-cloak>\n' +
    '					<span id="todo-count"><strong>{{remainingCount}}</strong>\n' +
    '						<ng-pluralize count="remainingCount" when="{ one: \'item left\', other: \'items left\' }"></ng-pluralize>\n' +
    '					</span>\n' +
    '    <ul id="filters">\n' +
    '        <li>\n' +
    '            <a ng-class="{selected: status == \'\'} " href="#/">All</a>\n' +
    '        </li>\n' +
    '        <li>\n' +
    '            <a ng-class="{selected: status == \'active\'}" href="#/active">Active</a>\n' +
    '        </li>\n' +
    '        <li>\n' +
    '            <a ng-class="{selected: status == \'completed\'}" href="#/completed">Completed</a>\n' +
    '        </li>\n' +
    '    </ul>\n' +
    '    <button id="clear-completed" ng-click="clearCompletedTodos()" ng-show="completedCount">Clear completed ({{completedCount}})</button>\n' +
    '</footer>');
}]);
})();

(function(module) {
try {
  module = angular.module('characterPartials');
} catch (e) {
  module = angular.module('characterPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/partials/homeland.html',
    '<h2>Homeworld\n' +
    '</h2>\n' +
    '<p class="explainer">\n' +
    '    It\'s a place of origin.\n' +
    '</p>\n' +
    '<h3>Your Homeworld</h3>\n' +
    '\n' +
    '<table class="table table-striped">\n' +
    '    <thead>\n' +
    '        <tr>\n' +
    '            <th></th>\n' +
    '            <th>Name</th>\n' +
    '            <th>Bonus Skill</th>\n' +
    '        </tr>\n' +
    '    </thead>\n' +
    '    <tbody>\n' +
    '    <tr ng-repeat="item in homelands">\n' +
    '        <td><input type="radio" ng-value="item" ng-model="character.homeworld"></td>\n' +
    '        <td>{{item.Homeworld}}</td>\n' +
    '        <td ng-if="item.bonus_skill_options.length === 1">{{ item[\'Bonus Skill\'] }}</td>\n' +
    '        <td ng-if="item.bonus_skill_options.length > 1">\n' +
    '            <select\n' +
    '                    ng-model="item.chosen_bonus_skill"\n' +
    '                    ng-options="choize for choize in item.bonus_skill_options">\n' +
    '            </select>\n' +
    '        </td>\n' +
    '    </tr>\n' +
    '    </tbody>\n' +
    '</table>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('characterPartials');
} catch (e) {
  module = angular.module('characterPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/partials/hook.html',
    '<h2>Hook</h2>\n' +
    '<p class="explainer">\n' +
    '    A hook is the second half (Z) of the sentence "An X Y who/with Z"\n' +
    '</p>\n' +
    '\n' +
    '<div class="row display-row margin-top-15">\n' +
    '    <div class="col-md-3">Enter your hook</div>\n' +
    '    <div class="col-md-9">\n' +
    '        <textarea class="form-control" ng-model="character.hook" rows="3"/>\n' +
    '    </div>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('characterPartials');
} catch (e) {
  module = angular.module('characterPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/partials/origin.html',
    '<h2>Origin\n' +
    '</h2>\n' +
    '<p class="explainer">\n' +
    '    An origin story\n' +
    '</p>\n' +
    '<h3>\n' +
    '    Choose your Origin\n' +
    '</h3>\n' +
    '\n' +
    '<table class="table table-striped">\n' +
    '    <thead>\n' +
    '    <tr>\n' +
    '        <th></th>\n' +
    '        <th>Name</th>\n' +
    '        <th>Prerequisites</th>\n' +
    '        <th>Attributes</th>\n' +
    '        <th>Skill Choices</th>\n' +
    '        <th>Description</th>\n' +
    '        <th>Exploits</th>\n' +
    '        <th>Years</th>\n' +
    '        <th>Source</th>\n' +
    '    </tr>\n' +
    '    </thead>\n' +
    '    <tbody>\n' +
    '    <tr ng-repeat="item in origins">\n' +
    '        <td><input type="radio" ng-value="item" ng-model="character.origin" ng-change="character.calculateMinimumAge()"></td>\n' +
    '        <td>{{ item.Origin }}</td>\n' +
    '        <td>{{ item.Prerequisites }}</td>\n' +
    '        <td>{{ printAttributes(item.Attributes) }}</td>\n' +
    '        <td>{{ item[\'Skill Choices\'] }}</td>\n' +
    '        <td>{{ item.Description }}</td>\n' +
    '        <td>{{ item.Exploits }}</td>\n' +
    '        <td>{{ item.Years}}</td>\n' +
    '        <td>{{ item.Source}}</td>\n' +
    '    </tr>\n' +
    '    </tbody>\n' +
    '</table>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('characterPartials');
} catch (e) {
  module = angular.module('characterPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/partials/psionics.html',
    '<h2>Psionics</h2>\n' +
    '<p class="explainer">\n' +
    '    Psionics\n' +
    '<h3>Your Psionics</h3>\n' +
    '<table class="table table-striped">\n' +
    '    <thead>\n' +
    '    <tr>\n' +
    '        <th></th>\n' +
    '        <th>Name</th>\n' +
    '        <th>Category</th>\n' +
    '        <th>Description</th>\n' +
    '    </tr>\n' +
    '    </thead>\n' +
    '    <tbody>\n' +
    '    <tr ng-repeat="c in character.psionics">\n' +
    '        <td><button type="button" class="btn btn-primary" ng-click="removeItem(c)">Remove</button></td>\n' +
    '        <td ng-bind="c.name"></td>\n' +
    '        <td>{{ c.Category}}</td>\n' +
    '        <td>{{ c.Description}}</td>\n' +
    '    </tr>\n' +
    '    <tr ng-if="isEmpty(KEY)">\n' +
    '        <td colspan="7" class="text-center">No psionics selected.</td>\n' +
    '    </tr>\n' +
    '    </tbody>\n' +
    '</table>\n' +
    '<table class="table table-striped">\n' +
    '    <thead>\n' +
    '    <tr colspan="7">\n' +
    '        <th></th>\n' +
    '        <th>Name</th>\n' +
    '        <th>Category</th>\n' +
    '        <th>Description</th>\n' +
    '    </tr>\n' +
    '    </thead>\n' +
    '    <tbody>\n' +
    '    <tr ng-repeat="c in localPsionics">\n' +
    '        <td><button type="button" class="btn btn-primary" ng-click="addItem(c)">Add</button></td>\n' +
    '        <td>{{c.Name}}</td>\n' +
    '        <td>{{c.Category}}</td>\n' +
    '        <td>{{c.Description}}</td>\n' +
    '    </tr>\n' +
    '    </tbody>\n' +
    '</table>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('characterPartials');
} catch (e) {
  module = angular.module('characterPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/partials/race.html',
    '<h2>Race</h2>\n' +
    '<p class="explainer">\n' +
    '  Racial Description text\n' +
    '</p>\n' +
    '<table class="table table-striped">\n' +
    '    <thead>\n' +
    '    <tr>\n' +
    '        <th>Select</th>\n' +
    '        <th>Race</th>\n' +
    '        <th>Size</th>\n' +
    '        <th>Attributes</th>\n' +
    '        <th>Skill Choices</th>\n' +
    '        <th>Exploits</th>\n' +
    '    </tr>\n' +
    '    </thead>\n' +
    '    <tbody>\n' +
    '    <tr ng-repeat="r in races">\n' +
    '        <td><input type="radio" ng-model="character.race" ng-value="r" ng-change="changeRace()"></td>\n' +
    '        <td ng-bind="r.Race"></td>\n' +
    '        <td ng-bind="r.Size"></td>\n' +
    '        <td ng-bind="printAttributes(r.Attributes)"></td>\n' +
    '        <td ng-bind="r[\'Skill Choices\']"></td>\n' +
    '        <td ng-bind="r.Exploits"></td>\n' +
    '    </tr>\n' +
    '    </tbody>\n' +
    '</table>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('characterPartials');
} catch (e) {
  module = angular.module('characterPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/partials/skills.html',
    '<h2>Skills</h2>\n' +
    '<p class="explainer">\n' +
    '    Choose your skills.\n' +
    '</p>\n' +
    '<p ng-if="character.homeworld">\n' +
    '    Bonus skill: {{ character.homeworld[\'Bonus Skill\'] }}\n' +
    '</p>\n' +
    '\n' +
    '<table class="table table-striped">\n' +
    '    <thead>\n' +
    '    <tr>\n' +
    '        <th>Skill Name</th>\n' +
    '        <th>Rank</th>\n' +
    '        <th>Dice Pool</th>\n' +
    '    </tr>\n' +
    '    </thead>\n' +
    '    <tbody>\n' +
    '    <tr ng-repeat="c in character.skills track by $index">\n' +
    '        <td>{{ c.name }}</td>\n' +
    '        <td>{{ c.rank }}</td>\n' +
    '        <td>{{ c.dicePool() }}</td>\n' +
    '    </tr>\n' +
    '    </tbody>\n' +
    '</table>\n' +
    '\n' +
    '<table class="table table-striped">\n' +
    '    <thead>\n' +
    '    <tr>\n' +
    '        <th>Source</th>\n' +
    '        <th>Skill Choices</th>\n' +
    '    </tr>\n' +
    '    </thead>\n' +
    '    <tbody>\n' +
    '    <tr ng-repeat="c in skillChoices track by $index">\n' +
    '        <td>{{ c.sourceType }}: {{ c.sourceName }}</td>\n' +
    '        <td>\n' +
    '            <select\n' +
    '                    ng-model="character.skillChoices[c.sourceName]"\n' +
    '                    ng-change="rebuildSkills()"\n' +
    '                    ng-options="choize for choize in c.choices">\n' +
    '            </select>\n' +
    '\n' +
    '        </td>\n' +
    '    </tr>\n' +
    '    </tbody>\n' +
    '</table>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('characterPartials');
} catch (e) {
  module = angular.module('characterPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/partials/trait.html',
    '<h2>Trait</h2>\n' +
    '<p class="explainer">\n' +
    '  Your trait is a thing that shows how traity you are.\n' +
    '</p>\n' +
    '<table class="table table-striped">\n' +
    '    <thead>\n' +
    '    <tr>\n' +
    '        <th></th>\n' +
    '        <th>Trait</th>\n' +
    '        <th>Benefit</th>\n' +
    '    </tr>\n' +
    '    </thead>\n' +
    '    <tbody>\n' +
    '    <tr ng-repeat="trait in allTraits()">\n' +
    '        <td><input type="radio" ng-model="character.Trait" ng-value="trait"></td>\n' +
    '        <td>{{trait}}</td>\n' +
    '        <td>{{traitsHash[trait].Benefit}}</td>\n' +
    '    </tr>\n' +
    '    </tbody>\n' +
    '</table>\n' +
    '');
}]);
})();

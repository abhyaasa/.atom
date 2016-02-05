'use strict';

angular.module('app')

.controller('CardController', function ($rootScope, $log) {
    $log.debug('Card');    
    debug('DEBUGGING', 1, 2);
})

.controller('CardHelpController', function ($scope, $rootScope) {})

.service('nextCard', function ($log, $rootScope, $state) {
    return function () {
        var remaining = $rootScope.deck.remaining;
        if (remaining.length === 0) { $state.go('tabs.deck'); }
        $rootScope.card = $rootScope.questions[remaining.shift()];
        $log.debug('nextCard', JSON.stringify($rootScope.card));
    };
});

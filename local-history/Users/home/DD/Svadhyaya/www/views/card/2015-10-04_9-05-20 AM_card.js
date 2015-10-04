'use strict';

angular.module('app')

.controller('CardController', function ($rootScope, $log) {
    $log.debug('Card');
})

.controller('CardHelpController', function ($scope, $rootScope) {})

.service('nextCard', function ($log, $rootScope, $state) {
    return function () {
        var nextIndex = $rootScope.deck.remaining.shift();
        $rootScope.card = $rootScope.deck.remaining.questions[nextIndex];
        $log.debug('nextCard', $rootScope.card);
        if (!$rootScope.card) { $state.go('tabs.deck'); }
    };
});

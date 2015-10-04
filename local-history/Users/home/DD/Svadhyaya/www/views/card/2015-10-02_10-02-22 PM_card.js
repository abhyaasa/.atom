'use strict';

angular.module('app')

.controller('CardController', function ($rootScope, $log) {
    $log.debug('Card');
})

.controller('CardHelpController', function ($scope, $rootScope) {})

.service('nextCard', function ($log, $rootScope) {
    return function () {
        $rootScope.card = $rootScope.deck.remaining.shift();
        $log.debug('nextCard', $rootScope.card);
    };
});

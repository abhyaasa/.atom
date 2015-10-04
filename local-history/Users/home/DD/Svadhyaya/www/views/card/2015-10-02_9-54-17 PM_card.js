'use strict';

angular.module('app')

.controller('CardController', function ($rootScope, $log) {
    $log.debug('Card', deck);
})

.controller('CardHelpController', function ($scope, $rootScope) {});

.service('nextCard', function ($rootScope) {
    return function () {
        $rootScope.card = $rootScope.deck.remaining.shift();
    }
};
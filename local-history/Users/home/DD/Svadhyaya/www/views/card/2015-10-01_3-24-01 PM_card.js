'use strict';

angular.module('app')

.controller('CardController', function ($rootScope, $scope, $log) {
    var deck = $rootScope.deck;
    this.next = function () {
        return deck.remaining.shift();
    };
    $scope.haveCard = !!deck;
    $log.debug('Card', deck, $scope.haveCard);
})

.controller('CardHelpController', function ($scope, $rootScope) {});

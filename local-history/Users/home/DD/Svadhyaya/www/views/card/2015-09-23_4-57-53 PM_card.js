'use strict';

angular.module('app')

.controller('CardController', function ($rootScope, $scope) {
    var deck = $rootScope.deck;
    $scope.haveCard = !!deck;
})

.controller('CardHelpController', function ($scope, $rootScope) {});

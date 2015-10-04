'use strict';

angular.module('app')

.controller('CardController', function ($rootScope) {
    var deck = $rootScope.deck;
    $scope.haveCard = !!deck;
})

.controller('CardHelpController', function ($scope, $rootScope) {});

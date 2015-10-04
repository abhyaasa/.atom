'use strict';

angular.module('app')

.controller('CardController', function ($scope, $stateParams) {
    var id = $stateParams.cardId;
    $scope.haveCard = !!id;
})

.controller('CardHelpController', function ($scope, $rootScope) {});

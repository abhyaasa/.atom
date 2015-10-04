angular.module('app')

.controller('CardController', function ($rootScope, $state, $stateParams) {
    var id = $stateParams.cardId;
    $scope.haveCard = !!id;
})
.controller('CardHelpController', function ($scope, $rootScope) {});

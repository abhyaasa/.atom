angular.module('app')

.controller('CardController', function ($rootScope, $state) {
    $rootScope.help = function () { $state.go('tabs.deck-help'); };
})

.controller('CardHelpController', function ($scope, $rootScope) {});

'use strict';

angular.module('app')

.controller('DeckController', function ($scope, $stateParams, $log) {
    var id = $stateParams.deckId;
    $log.debug('in DeckController:', 3, id);
});

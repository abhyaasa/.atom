'use strict';

angular.module('app')

.controller('DeckController', function ($scope, $stateParams, $log, getData) {
    var id = $stateParams.deckId;
    // getData('id,
    $log.debug('DeckController id', id);
});

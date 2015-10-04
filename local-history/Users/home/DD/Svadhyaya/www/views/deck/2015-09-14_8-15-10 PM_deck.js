'use strict';

angular.module('app')

.controller('DeckController', function ($scope, $stateParams, $log, getData, config) {
    var id = $stateParams.deckId;
    getData(config.flavor + '/' + id).then(function (data) {
        $log.debug(data);
    });
});

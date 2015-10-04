'use strict';

angular.module('app')

.controller('DeckController', function ($scope, $stateParams, $log, getData) {
    var id = $stateParams.deckId;
    getData($scope.flavor + '/' + id).then(function (data) {
        $log.debug(data);
    });
});

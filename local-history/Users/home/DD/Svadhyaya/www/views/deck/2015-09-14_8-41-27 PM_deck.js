'use strict';

angular.module('app')

.controller('DeckController', function ($stateParams, $state, $log, getData, config) {
    var id = $stateParams.deckId;
    getData(config.flavor + '/library/' + id).then(function (promise) {
        var questions = promise.data;
        var $state.info = {
            right: questions.length
        }
        $log.debug(JSON.stringify(questions));
    });
});

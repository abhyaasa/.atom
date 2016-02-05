'use strict';

angular.module('app')

.controller('DeckController', function ($rootScope, $scope, $state, debug,
    getData, config, _, nextCard) {
    var filter = function (questions) {
        // TODO use filter settings
        return _.range(0, questions.length);
    };
})

.controller('DeckHelpController', function ($scope, $rootScope) {})

.service('setupDeck', function ($rootScope, getData, config) {
    return function (deckName) {
        debug('DeckController', JSON.stringify($stateParams), deckName.fullName);
        var filter_settings = {
            max: 50,
            min: 50,
            required: [],
            exclude: [],
            include: []
        };
        getData('flavors/' + config.flavor + '/library/' + deckName.fullName)
        .then(function (promise) {
            $rootScope.questions = promise.data;
            $rootScope.deck = {
                fullName: fullName,
                displayName: displayName,
                right: [],
                wrong: [],
                close: [],
                hints: 0,
                skipped: [],
                remaining: filter($rootScope.questions),
                filter_settings: filter_settings
            };
            debug('deck num questions', $rootScope.questions.length);
            nextCard();
            $state.go('tabs.card');
        });
    }
});

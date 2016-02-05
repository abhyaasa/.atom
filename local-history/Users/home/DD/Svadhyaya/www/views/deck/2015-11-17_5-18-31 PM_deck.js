'use strict';

angular.module('app')

.controller('DeckController', function () {
})

.controller('DeckHelpController', function () {})

.service('Deck', function ($log) {
    var initialFilterSettings = {
        max: 50,
        min: 50,
        required: [],
        exclude: [],
        include: []
    };
    this.setup = function (deckNames) {
        $log.debug('Deck setup', JSON.stringify(deckName));
        getData('flavors/' + config.flavor + '/library/' + deckName.fullName)
        .then(function (promise) {
            $rootScope.questions = promise.data;
            $rootScope.deck = {
                fullName: deckName.fullName,
                displayName: deckName.displayName,
                right: [],
                wrong: [],
                close: [],
                hints: 0,
                skipped: [],
                remaining: deckFilter($rootScope.questions),
                filterSettings: filterSettings
            };
            $log.debug('deck num questions', $rootScope.questions.length);
            nextCard();
        });
    };
})

// TODO move to Deck service
.service('deckFilter', function (_) {
    return function (questions) {
        // TODO use filter settings
        return _.range(0, questions.length);
    };
})

// TODO replace with Deck service that contains card and questions as well as deckSetup
.service('deckSetup', function ($rootScope, $state, $log, getData, deckFilter, config,
  nextCard) {
    return function (deckName) {
        $log.debug('Deck setup', JSON.stringify(deckName));
        var filterSettings = {
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
                fullName: deckName.fullName,
                displayName: deckName.displayName,
                right: [],
                wrong: [],
                close: [],
                hints: 0,
                skipped: [],
                remaining: deckFilter($rootScope.questions),
                filterSettings: filterSettings
            };
            $log.debug('deck num questions', $rootScope.questions.length);
            nextCard();
        });
    };
});

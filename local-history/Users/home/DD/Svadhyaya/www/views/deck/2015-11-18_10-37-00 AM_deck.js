'use strict';

angular.module('app')

.controller('DeckController', function ($scope, Deck) {
    $scope.deck = Deck;
})

.controller('DeckHelpController', function () {})

.service('Deck', function ($log, $state, config, getData, Card, _) {
    var initialSettings = {
        right: [],
        wrong: [],
        close: [],
        hints: 0,
        skipped: [],
        filter: {
            max: 50,
            min: 50,
            required: [],
            exclude: [],
            include: []
        }
    };
    var deckFilter = function (questions) {
        // TODO use filter settings
        return _.range(0, questions.length);
    };
    this.setup = function (deckNames) {
        $log.debug('Deck setup', JSON.stringify(deckNames));
        getData('flavors/' + config.flavor + '/library/' + deckNames.fullName)
        .then(function (promise) {
            this.questions = promise.data;
            this.fullName = deckNames.fullName;
            this.displayName = deckNames.displayName;
            this.remaining = deckFilter(this.questions);
            _.extend(this, initialSettings);
            Card.next();
        });
    };

    var makeItem = function (response) {
        return { text: response[1], style: 'no-response' };
    };
    this.nextCard = function () {
        if (this.remaining.length === 0) { $state.go('tabs.deck'); }
        var card = $rootScope.questions[remaining.shift()];
        if (card.type === 'multiple-choice') {
            card.responseItems = _.map(card.responses, makeItem);
            card.isMA = _.contains(card.tags, '.ma');
        }
        $rootScope.card = card;
        $log.debug('nextCard', JSON.stringify($rootScope.card));
        $state.go('tabs.card');
    };
})
;

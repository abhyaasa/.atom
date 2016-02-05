'use strict';

angular.module('app')

.controller('DeckController', function ($scope, Deck) {
    $scope.deck = Deck;
})

.controller('DeckHelpController', function () {})

.service('Deck', function ($log, $state, config, getData, _) {
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
        this.cardIndex = this.remaining.shift();
        this.card = this.questions[this.cardIndex];
        if (this.card.type === 'multiple-choice') {
            this.card.responseItems = _.map(this.card.responses, makeItem);
            this.card.isMA = _.contains(this.card.tags, '.ma');
        }
        $log.debug('nextCard', JSON.stringify(this.card));
        $state.go('tabs.card');
    };
})
;

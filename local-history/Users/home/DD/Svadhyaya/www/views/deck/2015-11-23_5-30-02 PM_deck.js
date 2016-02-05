'use strict';

angular.module('app')

.controller('DeckController', function ($scope, Deck) {
    $scope.Deck = Deck;
    // TODO manage filter controls
})

.controller('DeckHelpController', function () {})

.service('Deck', function ($log, $state, Card, config, getData, _) {
    var Deck = this;

    var initialFilterSettings = {
        max: 50,
        min: 50,
        required: [],
        exclude: [],
        include: []
    };
    var copy = function (obj) {
        return _.mapObject(obj, function (val) { return _.clone(val); });
    };
    var filter = function (questions) {
        // returns list of indices of questions that pass filter
        // TODO use filter settings
        return _.range(0, questions.length);
    };

    Deck.setup = function (deckName) {
        $log.debug('Deck setup', JSON.stringify(deckName));
        getData('flavors/' + config.flavor + '/library/' + deckName.full)
        .then(function (promise) {
            Deck.questions = promise.data;
            Deck.data = {
                name: deckName,
                history: _.map(Deck.questions, function () { return []; }),
                filter: copy(initialFilterSettings),
                active: filter(Deck.questions), // indices of active quesitons
                cardActiveIndex: 0 // current card ref. into active index list
            };
        });
    };

    this.next = function () {
        Deck.data.cardActiveIndex += 1;
        if (Deck.data.active.length === Deck.data.cardActiveIndex) {
            $state.go('tabs.deck');
        }
        Card.setup(Deck.data.cardActiveIndex);
        $state.go('tabs.card');
    };

    this.outcome = function (outcomeName) {
        if (!_.contains(['right', 'wrong', 'close', 'skipped'], outcomeName)) {
            $log.error('Bad outcome', outcomeName);
        }
        Deck[outcomeName].push(Deck.cardIndex);
    };
})
;

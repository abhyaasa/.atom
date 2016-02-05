'use strict';

angular.module('app')

.controller('DeckController', function ($scope, Deck) {
    var multiset = function (array) {
        var ms = {};
        array.map(function (value) {
            if (_.has(ms, value)) {
                ms[value] += 1;
            } else {
                ms[value] = 1;
            }
        });
        return ms;
    };

    $scope.Deck = Deck;
    $scope.$on('$ionicView.enter', function() {
        if (Deck.data) {
            $scope.count = multiset(Deck.outcomes);
        }
    });
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
                activeCardIndex: -1 // current card ref. into active index list
            };
            Deck.data.outcomes = new Array(Deck.data.active.length);
            this.nextCard();
        });
    };

    this.outcome = function (outcome) {
        Deck.data.outcomes[Deck.data.activeCardIndex] = outcome;
        Deck.data.history[Card.question.id].push(outcome);
    };

    this.nextCard = function () {
        if (Deck.data.activeCardIndex === Deck.data.active.length - 1) {
            Card.setup(0);
            $state.go('tabs.deck');
        } else {
            Card.setup(Deck.data.activeCardIndex + 1);
            $state.go('tabs.card');
        }
    };

    this.previousCard = function () {
        if (Deck.data.activeCardIndex === 0) {
            Card.setup(Deck.data.active.length - 1);
            $state.go('tabs.deck');
        } else {
            Card.setup(Deck.data.activeCardIndex - 1);
            $state.go('tabs.card');
        }
    };
})
;

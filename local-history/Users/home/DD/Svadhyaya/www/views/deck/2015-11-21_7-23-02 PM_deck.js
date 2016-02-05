'use strict';

angular.module('app')

.controller('DeckController', function ($scope, Deck) {
    $scope.Deck = Deck;
    // TODO manage filter controls
})

.controller('DeckHelpController', function () {})

.service('Deck', function ($log, $state, config, getData, _) {
    var copy = function (obj) {
        return _.mapObject(obj, function (val) { return _.clone(val); });
    };
    var initialDeckValues = {
        right: [],
        wrong: [],
        close: [],
        skipped: [],
        hints: 0
    };
    var initialFilterSettings = {
        max: 50,
        min: 50,
        required: [],
        exclude: [],
        include: []
    };
    var deckFilter = function (questions) {
        // TODO use filter settings
        return _.range(0, questions.length);
    };
    this.setup = function (deckName) {
        $log.debug('Deck setup', JSON.stringify(deckName));
        getData('flavors/' + config.flavor + '/library/' + deckName.full)
        .then(function (promise) {
            this.name = deckName;
            this.questions = promise.data;
            this.remaining = deckFilter(this.questions);
            _.extend(this, copy(initialDeckValues));
            this.filter = copy(initialFilterSettings);
            this.next();
        });
    };

    var makeItem = function (response) {
        return { text: response[1], style: 'no-response' };
    };
    this.next = function () {
        if (this.remaining.length === 0) {
            $state.go('tabs.deck');
        }
        this.cardIndex = this.remaining.shift();
        this.card = this.questions[this.cardIndex];
        if (this.card.type === 'multiple-choice') {
            this.card.isMA = _.contains(this.card.tags, '.ma');
            this.card.responseItems = _.map(this.card.responses, makeItem);
            this.card.numWrong = 0;
        }
        $log.debug('next', JSON.stringify(this.card));
        $state.go('tabs.card');
    };

    this.record = function (outcome) {
        if (!_.contains(['right', 'wrong', 'close', 'skipped'], outcome)) {
            $log.error('Bad outcome', outcome);
        }
        this[outcome].push(this.cardIndex);
    };
})
;

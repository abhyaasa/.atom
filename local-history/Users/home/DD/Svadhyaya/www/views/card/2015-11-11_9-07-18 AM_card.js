'use strict';

angular.module('app')

.controller('CardController', function ($rootScope, $scope, debug, _, nextCard) {
    debug('in CardController');
    // $scope.multipleChoice = function () {
    //     responses = $rootScope.card.responses;
    //     this.style = _.map(_.constant(undefined), _.range(responses.length));
    // };
    var isRight = function (response) {
        return response[0];
    };
    $scope.nextCard = function () { // nextCard;
        debug('scope nextCard');
        nextCard();
    };
    $scope.response = function (item) {
        var card = $rootScope.card;
        var style = card.responseStyle;
        var rightIndex = _.findIndex(card.responses, isRight);
        if (_.contains(card.tags, '.ma')) {
            var x = 1; // XXX do something
        } else {
            style[rightIndex] = 'right-response';
            if (item.index === rightIndex) {
                style[item.index] = 'wrong-response';
            }
        }
        debug('style', JSON.stringify(style));
    };
    debug('Card');
})

.controller('CardHelpController', function () {})

.service('nextCard', function (debug, $rootScope, $state, _) {
    return function () {
        var remaining = $rootScope.deck.remaining;
        if (remaining.length === 0) { $state.go('tabs.deck'); }
        var card = $rootScope.questions[remaining.shift()];
        if (card.type === 'multiple-choice') {
            card.responseStyle = _.map(card.responses, _.constant('no-response'));
        }
        $rootScope.card = card;
        debug('nextCard', JSON.stringify($rootScope.card));
    };
});

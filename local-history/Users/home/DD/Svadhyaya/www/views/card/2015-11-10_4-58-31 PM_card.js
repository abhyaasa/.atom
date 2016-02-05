'use strict';

angular.module('app')

.controller('CardController', function ($rootScope, $scope, debug, _, nextCard) {
    var responses;
    debug('in CardController');
    // $scope.multipleChoice = function () {
    //     responses = $rootScope.card.responses;
    //     this.style = _.map(_.constant(undefined), _.range(responses.length));
    // };
    $scope.response = function (item) {
        var style = $rootScope.card.responseStyle;
        if (responses[item.index][0]) {
            style[item.index] = 'right-response';
        } else {
            style[item.index] = 'wrong-response';
            // TODO this.style[??] = 'right-response';
        }
        nextCard();
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
            card.responseStyle = _.map(_.identity('no-response'), card.responses);
        }
        $rootScope.card = card;
        debug('nextCard', JSON.stringify($rootScope.card));
    };
});

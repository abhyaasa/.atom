'use strict';

angular.module('app')

.controller('CardController', function ($rootScope, $scope, $log, _, nextCard) {
    var isRight = function (response) {
        return response[0];
    };
    $log.debug('CardController');
    $scope.nextCard = function () { // XXX simplify
        $log.debug('scope nextCard');
        nextCard();
    };
    $scope.response = function (item) {
        var card = $rootScope.card;
        var style = card.responseStyle;
        var rightIndex = _.findIndex(card.responses, isRight);
        if (_.contains(card.tags, '.ma')) {
            alert(1); // XXX do something
        } else {
            style[rightIndex] = 'right-response';
            if (item.index === rightIndex) {
                style[item.index] = 'wrong-response';
            }
        }
        $log.debug('style', JSON.stringify(style));
    };
})

.controller('CardHelpController', function () {})

.service('nextCard', function ($log, $rootScope, $state, _) {
    return function () {
        var remaining = $rootScope.deck.remaining;
        if (remaining.length === 0) { $state.go('tabs.deck'); }
        var card = $rootScope.questions[remaining.shift()];
        if (card.type === 'multiple-choice') {
            card.responseStyle = _.map(card.responses, _.constant('no-response'));
        }
        $rootScope.card = card;
        $log.debug('nextCard', JSON.stringify($rootScope.card));
    };
});

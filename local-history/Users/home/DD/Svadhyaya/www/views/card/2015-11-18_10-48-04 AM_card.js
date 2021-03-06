'use strict';

angular.module('app')

.controller('CardController', function ($rootScope, $scope, $log, _, Deck,
  $ionicGesture) {
    $log.debug('CardController');
    var element = angular.element(document.querySelector('#content'));
    $ionicGesture.on('swipeleft', Deck.nextCard, element);

    var isRight = function (response) {
        return response[0];
    };

    $scope.response = function (index) {
        var card = $rootScope.card;
        var items = card.responseItems;
        if (_.contains(card.tags, '.ma')) {
            $log.debug('multiple answer');
            if (card.responses[index][0]) {
                items[index].style = 'right-response';
            } else {
                items[index].style = 'wrong-response';
            }
        } else {
            var rightIndex = _.findIndex(card.responses, isRight);
            items[rightIndex].style = 'right-response';
            if (index !== rightIndex) {
                items[index].style = 'wrong-response';
            }
            // TODO score
        }
        $log.debug('response items', JSON.stringify(items));
    };

    $scope.maDone = function () {
        // TODO score and nextcard
    };
})

.controller('CardHelpController', function () {})
;

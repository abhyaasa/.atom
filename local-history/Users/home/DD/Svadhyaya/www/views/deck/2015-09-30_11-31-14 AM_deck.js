'use strict';

angular.module('app')

.controller('DeckController', function ($stateParams, $rootScope, $scope, $state, $log,
  getData, config) {
    var id = $stateParams.deckId;
    $scope.haveDeck = !!id;
    if ($scope.haveDeck) {
        getData('flavors/' + config.flavor + '/library/' + id).then(function (promise) {
            var questions = promise.data;
            $rootScope.deck = {
                right: [],
                wrong: [],
                close: [],
                hints: 0,
                skipped: [],
                remaining: questions,
                filter: {
                    max: 50,
                    min: 50,
                    required: [],
                    exclude: [],
                    include: []
                }
            };
            $log.debug('deck questions', JSON.stringify(questions));
        });
    }
})

.controller('DeckHelpController', function ($scope, $rootScope) {});

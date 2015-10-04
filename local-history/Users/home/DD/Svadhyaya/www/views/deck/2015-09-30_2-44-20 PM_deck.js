'use strict';

angular.module('app')

.controller('DeckController', function ($stateParams, $rootScope, $scope, $state, $log,
    getData, config, _) {
    var id = $stateParams.deckId;
    var filter = {
        max: 50,
        min: 50,
        required: [],
        exclude: [],
        include: []
    };
    var filter = function (questions) {
        // TODO use filter settings
        return _.range(0, questions.length);
    };
    $scope.haveDeck = !!id;
    if ($scope.haveDeck) {
        getData('flavors/' + config.flavor + '/library/' + id).then(function (promise) {
                var questions = promise.data;
                $rootScope.deck = {
                    questions: questions,
                    right: [],
                    wrong: [],
                    close: [],
                    hints: 0,
                    skipped: [],
                    remaining: filter(questions),
                    filter: filter
                };
            }; $log.debug('deck questions', JSON.stringify(questions));
        });
}
})

.controller('DeckHelpController', function ($scope, $rootScope) {});

'use strict';

angular.module('app')

.controller('LibraryController', function ($rootScope, $scope, $state, $log, _, mode,
  Library, Deck) {
    $scope.selectDeck = function(deckName) {
        Deck.setup(deckName);
    };

    var fileNames = Library.getFileNames();
    $log.debug('fileNames', fileNames);
    var allDeckNames = _.map(fileNames, function (name) {
        return {
            full: name,
            // discard suffix and replace _ characters with spaces
            display: name.match(/.*(?=\.)/)[0].replace(/_/g, ' ')
        };
    });
    $scope.deckList = allDeckNames; // TODO filtering here
    if ($scope.deckList.length === 1 && mode !== 'debug') {
        $rootScope.config.hideLibrary = true;
        $rootScope.hideTabs = false;
        Deck.setup($scope.deckList[0]);
    } else {
        $rootScope.hideTabs = false;
    }
    // TODO implement search, Ionic in action 6.3, p 140
    // try AngularJS cookbook p 64 http://jsfiddle.net/msfrisbie/ghsa3nym/
    angular.extend($scope, {
        model: {searchText: ''}, // used in itest
        search: function () {
            $scope.deckList = _.filter(allDeckNames, function(deckName) {
                var name = deckName.display.toLowerCase;
                return name.indexOf($scope.model.searchText.toLowerCase) !== -1;
            });
        },
        clearSearch: function () {
            $scope.deckList = allDeckNames;
            $scope.model.searchText = '';
        }
    });
})

.controller('LibraryHelpController', function () {})

.service('Library', function ($log, getData, indexPromise, LocalStorage, _) {
    var openDecks = LocalStorage.getObject('openDecks');
    if (openDecks === undefined) {
        openDecks = [];
        LocalStorage.setObject('openDecks', []);
    }
    this.getDeckNames = function () {
        var fileNames = indexPromise.data;
        $log.debug('fileNames', fileNames);
        return _.map(fileNames, function (name) {
            return {
                full: name,
                // discard suffix and replace _ characters with spaces
                display: name.match(/.*(?=\.)/)[0].replace(/_/g, ' ')
            };
        });
    };
})
;

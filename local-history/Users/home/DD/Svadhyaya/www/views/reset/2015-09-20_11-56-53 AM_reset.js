'use strict';

angular.module('app')

.controller('ResetController', function ($log, $scope) {
    this.hideConfirm = true;
    this.hideWarning = true;
    this.selection = undefined;
    this.options = [
        { text: 'Reset current deck', value: 'deck' },
        { text: 'Reset all decks', value: 'all decks' },
        { text: 'Reset settings to defaults', value: 'settings' }
    ];
    this.selected = function(item) {
        this.hideWarning = item.value.indexOf('deck') === -1;
        this.hideConfirm = false;
    };
    this.confirmed = function () {
        // TODO do something
    };
});

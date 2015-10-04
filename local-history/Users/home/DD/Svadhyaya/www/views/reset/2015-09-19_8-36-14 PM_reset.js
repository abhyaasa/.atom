'use strict';

angular.module('app')

.controller('ResetController', function ($log, $scope) {
    this.hideConfirm = true;
    this.selection = undefined;
    this.options = [
        { text: 'Reset current deck', value: 'deck' },
        { text: 'Reset all decks', value: 'all' },
        { text: 'Reset settings to defaults', value: 'settings' }
    ];
    this.changed = function(item) {
        $log.debug('reset option', item.value);
    };
});

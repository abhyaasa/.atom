'use strict';

angular.module('app')

.controller('ResetController', function ($log, $scope) {
    this.hideConfirm = true;
    this.options = [
        { text: 'Reset current deck', value: 'deck' },
        { text: 'Reset all decks', value: 'all' },
        { text: 'Reset settings to defaults', value: 'settings' }
    ];
    $scope.serverSideChange = function(item) {
        $log.debug('reset option', item.value);
    };
});

angular.module('app')

.controller('ResetController', function ($scope) {
    $scope.hideConfirm = true;
    $scope.data = {
        resetOptions: 'ng'
    };
    $scope.resetOptions = [
        { text: 'Reset current deck', value: 'deck' },
        { text: 'Reset all decks', value: 'all' },
        { text: 'Reset settings to defaults', value: 'settings' }
     ];
});

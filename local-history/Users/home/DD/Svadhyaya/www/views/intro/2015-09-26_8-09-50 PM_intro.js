'use strict';

angular.module('app')

.controller('IntroController', function ($log, $state, $scope, settings, saveSettings) {
    $log.debug('INTRO');
    $scope.gotIt = function () {
        if (settings.intro) {
            settings.intro = false;
            saveSettings();
            $state.go('tabs.library');
        } else {
            $state.go('tabs.settings');
        }
    };
});

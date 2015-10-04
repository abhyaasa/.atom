'use strict';

angular.module('app')

.controller('SettingsController', function ($log, $scope, settings, saveSettings) {
    $scope.settings = settings;
    $scope.onExit = saveSettings;
    $log.debug('controller settings', JSON.stringify(settings));
})

.value('settings', {
    randomQuestions: true,
    randomResponses: false,
    devanagari: false,
    hintPercent: 10,
    filter: {
        max: 50,
        min: 50,
        required: [],
        exclude: [],
        include: []
    }
})

.service('restoreSettings', function ($log, settings, localStorage, _) {
    return function () {
        var s = localStorage.getObject('settings');
        if (s !== undefined) {
            $log.debug('restored settings', JSON.stringify(s));
            _.extendOwn(settings, s);
        }
    };
})

.service('saveSettings', function ($log, $state, settings, localStorage, _) {
    return function () {
        var s = {};
        _.extendOwn(s, settings);
        $log.debug('saved settings', JSON.stringify(s));
        localStorage.setObject('settings', s);
    };
});

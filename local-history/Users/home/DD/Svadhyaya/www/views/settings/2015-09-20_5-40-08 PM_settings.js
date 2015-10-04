'use strict';

angular.module('app')

.controller('SettingsController', function ($log, $scope, _, settings) {
    var s = {}
    _.extendOwn(s, settings);
    $scope.settings = settings;
    $log.debug('controller settings', JSON.stringify(settings));
})

.value('settings', {})

.service('restoreSettings', function ($log, settings, localStorage, _) {
    var defaultSettings = {
        randomQuestions: false,
        randomResponses: false,
        devanagari: false,
        hintPercent: 10
    };
    return function (reset) {
        _.extendOwn(settings, defaultSettings);
        if (!reset) {
            var s = localStorage.getObject('settings');
            if (s !== undefined) {
                $log.debug('restored settings', JSON.stringify(s));
                _.extendOwn(settings, s);
            };
        };
    };
});

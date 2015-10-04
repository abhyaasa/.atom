'use strict';

angular.module('app', ['ionic', 'utils'])

.config(function ($stateProvider, $urlRouterProvider, $logProvider) {
    $logProvider.debugEnabled(true); // PUBLISH .debugEnabled(false)

    $stateProvider
        .state('tab', {
            url: '/tab',
            abstract: true,
            templateUrl: 'views/tab.html'
        })
        .state('tab.decks', {
            url: '/decks',
            views: {
                'decks-tab': {
                    templateUrl: 'views/decks/decks.html',
                    controller: 'DecksController'
                }
            }
        })
        .state('tab.card', {
            url: '/card',
            views: {
                'card-tab': {
                    templateUrl: 'views/card/card.html',
                    controller: 'CardController'
                }
            }
        })
        // .state('tab.answer', {
        //     url: '/answer',
        //     views: {
        //         'card-tab': {
        //             templateUrl: 'views/answer/answer.html',
        //             controller: 'AnswerController'
        //         }
        //     }
        // })
        // .state('tab.deck', {
        //     url: '/deck/:deckId',
        //     views: {
        //         'card-tab': {
        //             templateUrl: 'views/deck/deck.html',
        //             controller: 'DeckController'
        //         }
        //     }
        // })
        .state('tab.settings', {
            url: '/settings',
            views: {
                'settings-tab': {
                    templateUrl: 'views/settings/settings.html',
                    controller: 'SettingsController'
                }
            }
        })
        // .state('tab.about', {
        //     url: '/about',
        //     views: {
        //         'settings-tab': {
        //             templateUrl: 'views/about/about.html',
        //             controller: 'AboutController'
        //         }
        //     }
        // })
        // .state('tab.help', {
        //     url: '/help',
        //     views: {
        //         'settings-tab': {
        //             templateUrl: 'views/help/help.html',
        //             controller: 'HelpController'
        //         }
        //     }
        // })
        // .state('tab.reset', {
        //     url: '/about',
        //     views: {
        //         'settings-tab': {
        //             templateUrl: 'views/reset/reset.html',
        //             controller: 'ResetController'
        //         }
        //     }
        // })
        .state('tab.filter', {
            url: '/deck',
            views: {
                'filter-tab': {
                    templateUrl: 'views/filter/filter.html',
                    controller: 'FilterController'
                }
            }
        });
    $urlRouterProvider.otherwise('/tab/decks');
})

/**
 * Use x name as tag, attribute, class name, or after directive in comment.
 * The associated element is removed.
 */
.directive('x', function () {
    return {
        restrict: 'AE',
        compile: function (el) {
            el.remove();
        }
    };
})

.run(function ($ionicPlatform, $rootScope, $state, $log, getData,
               restoreSettings) {
    getData('config.json', function (config) {
        $rootScope.config = config;
    });

    // https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions\
    // #issue-im-getting-a-blank-screen-and-there-are-no-errors
    // REVIEW $log.log instead of console?
    $rootScope.$on('$stateChangeError', console.log.bind(console));

    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the
        // accessory bar above the keyboard for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
        // XXX StatusBar.styleDefault(); // from ionic tab starter
        // XXX $state.go('tab.decks', {});
    });

    restoreSettings();
});

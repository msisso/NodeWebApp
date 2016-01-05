/**
 * Created by Maor on 12/31/2015.
 */
'use strict';

angular.module('FlightsApp', [
        'ui.router',
        'ui.bootstrap',
        'btford.socket-io',
        'duScroll',
        'landpage'
    ])
    .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
    });

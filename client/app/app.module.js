/**
 * Created by Maor on 12/31/2015.
 */
'use strict';

angular.module('FlightsApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ui.router',
        'ui.select',
        'ngUpload',
        'ngAnimate',
        'restangular',
        'ui.bootstrap',
        'ui.bootstrap.datetimepicker',
        'cgNotify',
        'btford.socket-io',
        'duScroll',
        'landpage',
        'AdminDashboard'
    ])
    .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
    });

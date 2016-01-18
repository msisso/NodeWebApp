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
        'chart.js',
        'ngAnimate',
        'restangular',
        'uiGmapgoogle-maps',
        'ui.bootstrap',
        'ui.bootstrap.datetimepicker',
        'cgNotify',
        'btford.socket-io',
        'duScroll',
        'angularFileUpload',
        'landpage',
        'AdminDashboard',
        'travelagency',
    ])
    .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
    });

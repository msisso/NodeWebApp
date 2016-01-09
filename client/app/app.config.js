/**
 * Created by Maor on 12/31/2015.
 */


angular.module('FlightsApp')
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('main', {
                url: '/',
                templateUrl: 'app/landpage/views/landpage.html',
                controller: 'LandpageController'
            })
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'app/AdminDashboard/views/admin.dashboard.html',
                controller: 'DashboardController'
            })
            .state('dashboard.manage', {
                url: '/manage',
                templateUrl: 'app/AdminDashboard/modules/manage/views/manage.html',
                controller: 'ManageController'
            });
        $urlRouterProvider.otherwise('/');
    })
    .run(function($state, $rootScope) {
        $rootScope.$state = $state;
    });

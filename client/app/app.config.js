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
            })
            .state('dashboard.stats', {
                url: '/stats',
                templateUrl: 'app/AdminDashboard/modules/stats/views/stats.html',
                controller: 'StatsController'
            })
            .state('dashboard.demo', {
                url: '/demo',
                templateUrl: 'app/AdminDashboard/modules/demo/views/demo.html',
                controller: 'DemoController'
            })
            .state('dashboard.demo.screen', {
                url: '/screen/:id',
                templateUrl: 'app/AdminDashboard/modules/demo/views/demo.screen.html',
                controller: 'DemoScreenController'
            });
        $urlRouterProvider.otherwise('/');
    })
    .run(function($state, $rootScope) {
        $rootScope.$state = $state;
    });

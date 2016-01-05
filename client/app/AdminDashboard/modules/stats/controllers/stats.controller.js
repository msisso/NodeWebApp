'use strict';

angular.module('dashboard.stats')
  .controller('StatsController', ['$scope', '$state', '$stateParams', 'Stats', 'uiGmapGoogleMapApi',
    function($scope, $state, $stateParams, Stats, uiGmapGoogleMapApi) {

      $scope.collapse = {
        byScreen: false,
        byTemplate: false,
        clients: false
      };

      $scope.$watch('$viewContentLoaded', function() {

        // Usage statistics according to field 'screens'
        Stats.getStatsByField('screens')
          .then(function(res) {
            $scope.byScreen = res.map(function(entry) {
              return {
                name: 'Screen ' + entry._id,
                count: entry.items.length
              };
            });
            $scope.byScreen.sort(function(a, b) {
              return a.count < b.count;
            });
          });

        // Usage statistics according to field 'template'
        Stats.getStatsByField('template')
          .then(function(res) {
            $scope.byTemplate = res.map(function(entry) {
              return {
                name: 'Template ' + entry._id,
                count: entry.items.length
              };
            });
            $scope.byTemplate.sort(function(a, b) {
              return a.count < b.count;
            });
          });

        $scope.map = {center: {latitude: 32.321458, longitude: 34.853196}, zoom: 9};
        Stats.getClients()
          .then(function(markers) {
            $scope.markers = markers;
          });

      });
    }]);

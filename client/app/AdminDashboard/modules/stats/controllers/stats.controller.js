'use strict';

angular.module('dashboard.stats')
  .controller('StatsController', ['$scope', '$state', '$stateParams', 'Stats',
    function($scope, $state, $stateParams, Stats) {

      $scope.collapse = {
        byScreen: false,
        byTemplate: false,
      };

      $scope.$watch('$viewContentLoaded', function() {

        // Usage statistics according to field 'screens'
        Stats.getStatsByField('screensId')
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
        Stats.getStatsByField('templateName')
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



      });
    }]);

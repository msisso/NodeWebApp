'use strict';

angular.module('dashboard.stats')
  .controller('StatsController', ['$scope', '$state', '$stateParams', 'Stats','uiGmapGoogleMapApi',
    function($scope, $state, $stateParams, Stats, uiGmapGoogleMapApi) {

      $scope.collapse = {
          byScreen: false,
          byTemplate: false,
          byTemplateCanvas: false,
          byScreenCanvas: false,
      };

      $scope.$watch('$viewContentLoaded', function() {

        // Usage statistics according to field 'screens'
        Stats.getStatsByField('screensId')
            .then(function(res) {

                $scope.screenLabels = res.map(function(entry){
                    return 'screen ' + entry._id;
                });
                $scope.screenData = res.map(function(entry){
                    return entry.items.length;
                });
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

              $scope.templateLabels = res.map(function(entry){
                  return 'Template ' + entry._id;
              });
              $scope.templateData = res.map(function(entry){
                  return entry.items.length;
              });

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

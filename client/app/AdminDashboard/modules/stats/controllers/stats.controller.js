'use strict';

angular.module('dashboard.stats')
  .controller('StatsController', ['$scope', '$state', '$stateParams', 'Stats','uiGmapGoogleMapApi','Coords',
    function($scope, $state, $stateParams, Stats, uiGmapGoogleMapApi,Coords) {

      $scope.collapse = {
          byScreen: false,
          byTemplate: false,
          byTemplateCanvas: false,
          byScreenCanvas: false,
          ourAgencies: false
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


          $scope.markers = [];
          $scope.map = {center: {latitude: 32.321458, longitude: 34.853196}, zoom: 9};
          Stats.getClients()
              .then(function(markers) {
                  angular.forEach(markers, function(value, key){
                      Coords.getCoordsByAddreess(value.address + ' ' + value.city + ' ' + value.country)
                          .then(function(res){
                              console.log(res.results[0]);
                              var temp = {
                                  coords: {
                                      latitude: res.results[0].geometry.location.lat,
                                      longitude: res.results[0].geometry.location.lng
                                  },
                                  id: res.results[0].place_id
                              };
                              console.log(temp);
                              $scope.markers.push(temp);
                          });

                  });

              });


      });
    }]);

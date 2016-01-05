'use strict';

angular.module('dashboard.demo')
  .controller('DemoScreenController', ['$scope', '$state', '$stateParams', 'socket', 'Ads',
    function($scope, $state, $stateParams, socket, Ads) {

      $scope.screenId = $stateParams.id;
      var filterByScreenId = function(ads, screenId) {
        return _.filter(ads, function(ad) {
          return _.includes(ad.screens, screenId);
        });
      };

      $scope.fetch = function() {
        Ads.getList().then(function(ads) {
          $scope.ads = filterByScreenId(ads, $scope.screenId);
        });
      };

      $scope.$on('$viewContentLoaded', function(event, data) {
        $scope.fetch();
      });

    }]);

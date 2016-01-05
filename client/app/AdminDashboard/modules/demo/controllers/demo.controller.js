'use strict';

angular.module('dashboard.demo')
  .controller('DemoController', ['$scope', '$state', '$stateParams', 'socket', 'Ads',
    function($scope, $state, $stateParams, socket, Ads) {

      $scope.collapse = {
        demo: false
      };

      $scope.screens = [
        {
          id: 1,
          name: 'Screen 1',
          checked: false
        },
        {
          id: 2,
          name: 'Screen 2',
          checked: false
        },
        {
          id: 3,
          name: 'Screen 3',
          checked: false
        }
      ];

      $scope.showScreen = function(screenId) {
        $scope.screenSelected = true;
        return ($state.is('dashboard.demo.screen') ? $state.go('^.screen', {id: screenId}) : $state.go('.screen', {id: screenId}));
      };

    }]);

'use strict';

angular.module('dashboard.demo')
  .controller('DemoController', ['$scope',
    function($scope) {
      $scope.screenSelected = false;
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

        if($scope.screenSelected){
            console.log("screen selected");
            onModalClose();
        }

        onModalOpen(screenId);
        $scope.screenSelected = true
      };

      $scope.$on("$destroy", function(){
        console.log("demo destroy");
        onModalClose();
      });
    }]);

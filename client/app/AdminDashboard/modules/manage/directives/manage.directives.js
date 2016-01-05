'use strict';

angular.module('dashboard.manage')
  .directive('scrollIf', ['$document', '$timeout', function($document, $timeout) {
    return {
      restrict: 'AE',
      link: function($scope, $element, $attrs) {
        $scope.$watch($attrs.scrollIf, function(value) {
          if (value) {
            $timeout(function() {
              $document.scrollToElementAnimated($element, 65, 1000);
            }, 0);
          }
        });
      }
    }
  }]);

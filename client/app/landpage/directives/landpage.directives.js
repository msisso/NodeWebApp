angular.module('landpage')
    .directive("scroll", ['$window',function ($window) {
        return function(scope, element, attrs) {
            angular.element($window).bind("scroll", function() {
                if (this.pageYOffset >= 300) {
                    element.addClass('navbar-shrink');
                } else {
                    element.removeClass('navbar-shrink');
                }
            });
        };
    }]);
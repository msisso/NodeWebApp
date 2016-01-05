

angular.module('landpage')
    .controller('LandpageController', ['$scope','$document',function($scope, $document){
        var services = angular.element(document.getElementById('services'));
        $scope.sections = [
                {name: 'services'},
                {name: 'trips'},
                {name: 'about'},
                {name: 'team'},
                {name: 'contact'}];

        $scope.toTheTop = function() {
                $document.scrollTopAnimated(0, 1000);
        }
        $scope.toTheServices = function() {
                $document.scrollToElementAnimated(services,122,1000);
        }
    }]
).value('duScrollOffset', 122).value('duScrollActiveClass', 'active');
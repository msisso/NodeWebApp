/**
 * Created by Maor on 1/9/2016.
 */
angular.module('AdminDashboard')
    .factory('Adverts', ['Restangular',
        function(Restangular) {
                return Restangular.service('api/ad');
        }]);

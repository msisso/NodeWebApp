angular.module('dashboard.stats')
    .factory('Coords', ['$q', '$http',
        function($q, $http) {
            var factory = {};

            factory.getCoordsByAddreess = function(field) {
                var deferred = $q.defer();
                console.log('http://maps.google.com/maps/api/geocode/json?address=' + field);
                $http.get('http://maps.google.com/maps/api/geocode/json?address=' + field)
                    .success(function(res) {

                        deferred.resolve(res);
                    })
                    .error(function(err) {
                        deferred.reject(err);
                    });

                return deferred.promise;
            };



            return factory;
        }]);


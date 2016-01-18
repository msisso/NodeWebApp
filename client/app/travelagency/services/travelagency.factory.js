angular.module('travelagency')
    .factory('rest', ['Restangular',
        function(Restangular) {
            return Restangular.service('api/ad');
        }])
    .factory('Searchtrav', ['$q', '$http',
        function($q, $http) {
            var factory = {};
            factory.searchBytravel = function(criteria) {
                var deferred = $q.defer();
                $http.post('/search/agency/travel', {searchparams: criteria})
                    .success(function(res) {
                        deferred.resolve(res);
                    })
                    .error(function(err) {
                        deferred.reject(err);
                    });
                return deferred.promise;
            };

            return factory;
        }])
    .factory('getAll',['$q', '$http',
        function($q, $http)
        {
            var factory = {};
            factory.getAll = function(){
                var deferred = $q.defer();
                $http.get('/api/travelagency')
                    .success(function(res) {
                        deferred.resolve(res);
                    })
                    .error(function(err) {
                        deferred.reject(err);
                    });
                return deferred.promise;
            };
            return factory;
        }
    ])
    .factory('Agencies', ['$q', '$http',

    function($q, $http) {
    var factory = {};

    factory.getAgencies = function() {
        var deferred = $q.defer();
        $http.get('/api/travelagency/agencies')
            .success(function(res) {

                deferred.resolve(res);
            })
            .error(function(err) {
                deferred.reject(err);
            });

        return deferred.promise;
    };

    return factory;
}])    .factory('Coords', ['$q', '$http',
    function($q, $http) {
        var factory = {};

        factory.getCoordsByAddreess = function(field) {
            var deferred = $q.defer();
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

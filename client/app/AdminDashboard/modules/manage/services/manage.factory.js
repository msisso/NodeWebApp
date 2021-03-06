angular.module('dashboard.manage')
    .factory('Search', ['$q', '$http',
        function($q, $http) {
            var factory = {};

            factory.searchByCriteria = function(criteria) {

                var deferred = $q.defer();
                $http.post('/search/ads', {searchparams: criteria})
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
    .factory('getAllAdverts',['$q', '$http',
        function($q, $http)
        {
            var factory = {};
            factory.getAllAdverts = function(){
                var deferred = $q.defer();
                $http.get('/api/ad')
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
    ]);

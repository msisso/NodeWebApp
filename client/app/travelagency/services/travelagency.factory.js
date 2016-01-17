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
                console.log(criteria);
                $http.post('/search/agency/travel', {searchparams: criteria})
                    .success(function(res) {
                        console.log("success" + res);
                        deferred.resolve(res);
                    })
                    .error(function(err) {
                        console.log(err);
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
                        console.log("success" + res);
                        deferred.resolve(res);
                    })
                    .error(function(err) {
                        console.log(err);
                        deferred.reject(err);
                    });
                return deferred.promise;
            };
            return factory;
        }
    ])
;

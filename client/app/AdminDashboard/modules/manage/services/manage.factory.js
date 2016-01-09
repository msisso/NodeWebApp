angular.module('dashboard.manage')
    .factory('Search', ['$q', '$http',
        function($q, $http) {
            var factory = {};

            factory.searchByCriteria = function(criteria) {

                var deferred = $q.defer();
                console.log(criteria);
                $http.post('/search/ads', {searchparams: criteria})
                    .success(function(res) {
                        console.log("success" + res);
                        deferred.resolve(res);
                    })
                    .error(function(err) {
                        console.log(err);
                        deferred.reject(err);
                    });
                /*var req = {
                    method: 'POST',
                    url: 'http://localhost:8080/search',
                    data: criteria
                };
                console.log("enter search factory");
                $http(req).then(function(){console.log(res);});*/
                /*$http.get('/search', {params: criteria})
                    .success(function(res) {
                        console.log("success" + res);
                        deferred.resolve(res);
                    })
                    .error(function(err) {
                        console.lof("err");
                        deferred.reject(err);
                    });*/

                return deferred.promise;
            };

            return factory;
        }]);
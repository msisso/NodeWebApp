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
                        console.log("success" + res);
                        deferred.resolve(res);
                    })
                    .error(function(err) {
                        console.log(err);
                        deferred.reject(err);
                    });
                return deferred.promise;
                //var ads = Adverts.getList().$object;
                //deferred.resolve(ads);


            };
            return factory;

        }
    ]);

angular.module('dashboard.stats')
  .factory('Stats', ['$q', '$http',
    function($q, $http) {
      var factory = {};

      factory.getStatsByField = function(field) {
        var deferred = $q.defer();
        $http.get('/api/stats', {params: {by: field}})
          .success(function(res) {
              deferred.resolve(res);
          })
          .error(function(err) {
            deferred.reject(err);
          });

        return deferred.promise;
      };

        factory.getClients = function() {
            var deferred = $q.defer();
            $http.get('/api/travelagency/agencies')
                .success(function(res) {
                    console.log("agencies");
                    console.log(res);
                    deferred.resolve(res);
                })
                .error(function(err) {
                    deferred.reject(err);
                });

            return deferred.promise;
        };

      return factory;
    }]);

angular.module('dashboard.stats')
  .factory('Stats', ['$q', '$http',
    function($q, $http) {
      var factory = {};

      factory.getStatsByField = function(field) {
          console.log("field" + field);
        var deferred = $q.defer();
        $http.get('/api/stats', {params: {by: field}})
          .success(function(res) {
              console.log("stats");
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

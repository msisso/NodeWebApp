'use strict';

angular.module('dashboard.manage')
  .factory('Search', ['$q', '$http',
    function($q, $http) {
      var factory = {};

      factory.searchByCriteria = function(criteria) {
        var deferred = $q.defer();
        $http.get('/search/ads', {params: criteria})
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

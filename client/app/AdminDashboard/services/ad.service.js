'use strict';

angular.module('dashboard')
  .factory('Ads', ['Restangular',
    function(Restangular) {
      return Restangular.service('api/ads');
    }]);

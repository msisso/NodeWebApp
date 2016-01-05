'use strict';

angular.module('dashboard.stats')
  .config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
      key: 'AIzaSyD-osKnP4wbdgx5majdS9UDlgA0ISgvB4Q',
      v: '3.17',
      libraries: 'weather,geometry,visualization'
    });
  });

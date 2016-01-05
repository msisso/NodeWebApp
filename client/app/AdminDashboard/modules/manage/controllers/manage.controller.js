'use strict';

angular.module('dashboard.manage')
  .controller('ManageController', ['$scope', '$state', '$stateParams', '$timeout', 'notify', 'socket', 'Ads', 'Search',
    function($scope, $state, $stateParams, $timeout, notify, socket, Ads, Search) {

      /**
       *
       * @param o
       * @returns {{category: (*|AdSchema.category|category|Document.updateForm.category|Document.createForm.category|$scope.category), text: *, duration: *, screens: (*|AdSchema.screens|screens|Array), templateUrl: *, when: {fromTime: (string|*|Object|ServerResponse), fromDate: (string|*|Object|ServerResponse), toTime: (string|*|Object|ServerResponse), toDate: (string|*|Object|ServerResponse), weekDays: (*|.when.weekDays)}, images: Array}}
       */
      var preparePayload = function(o) {
        return {
          id: o._id,
          category: o.category,
          text: o.text,
          duration: o.duration,
          screens: o.screens,
          templateUrl: o.template[0],
          when: {
            fromTime: moment(o.startDateTime).format('HH:mm:ss'),
            fromDate: moment(o.startDateTime).format('DD/MM/YYYY'),
            toTime: moment(o.endDateTime).format('HH:mm:ss'),
            toDate: moment(o.endDateTime).format('DD/MM/YYYY'),
            weekDays: o.weekDays
          },
          images: []
        };
      };

      /**
       *
       * @param form
       * @param duration
       * @param startDateTime
       * @param endDateTime
       * @returns {*|boolean}
       */
      var isValid = function(form, duration, startDateTime, endDateTime) {
        return (form && !isNaN(duration) && duration > 0 && moment(endDateTime).isAfter(startDateTime));
      };

      $scope.newAd = $scope.existingAd = $scope.searchCreteria = {};
      $scope.collapse = {
        create: false,
        manage: false,
        search: false
      };

      /**
       * Does a GET to /api/ads. Returns an empty array by default.
       * Once a value is returned from the server that array is filled with those values.
       * @type {$object|*}
       */
      $scope.ads = Ads.getList().$object;
      socket.syncUpdates('ad', $scope.ads, function(event, item, array) {
        $scope.ads = array;
      });

      /**
       *
       * @param ad
       */
      $scope.deleteAd = function(ad) {
        $scope.ads = Ads.one(ad._id).remove();
      };

      /**
       *
       * @param ad
       */
      $scope.editAd = function(ad) {
        $scope.showLoaderForId = ad._id;
        if (_.isEmpty($scope.existingAd) || $scope.existingAd._id !== ad._id) {
          Ads.one(ad._id).get().then(function(o) {
            $scope.existingAd = o;
            $scope.existingAd.edit = !$scope.existingAd.edit;
            $scope.existingAd.startDateTime = moment(o.when.fromDate + ' ' + o.when.fromTime, 'DD/MM/YYYY HH:mm:ss').format();
            $scope.existingAd.endDateTime = moment(o.when.toDate + ' ' + o.when.toTime, 'DD/MM/YYYY HH:mm:ss').format();
            $scope.existingAd.weekDays = o.when.weekDays;
          });
        } else {
          $scope.existingAd.edit = !$scope.existingAd.edit;
        }
      };

      /**
       *
       */
      $scope.$on('$destroy', function() {
        socket.unsyncUpdates('ad');
      });

      /**
       *
       * @param form
       */
      $scope.create = function(form) {
        if (isValid(form, $scope.newAd.duration, $scope.newAd.startDateTime, $scope.newAd.endDateTime)) {
          $scope.changeCreateButton = true;
          Ads.post(preparePayload($scope.newAd))
            .then(function(res) {
              notify('A new "' + $scope.newAd.category + '" ad has been successfully created. Please note that we have automatically added it to your ads inventory. If you would like the test your new ad, please navigate to our "Demo" page.');
              $scope.changeCreateButton = false;
              $scope.createForm.$setPristine();
              $scope.ads = Ads.getList().$object;
              $scope.newAd = {};
            });
        } else {
          $scope.createForm.submitted = $scope.createForm.$invalid = true;
        }
      };

      /**
       *
       * @param form
       */
      $scope.update = function(form) {
        if (isValid(form, $scope.existingAd.duration, $scope.existingAd.startDateTime, $scope.existingAd.endDateTime)) {
          $scope.changeSubmitButton = true;
          $scope.existingAd = _.merge($scope.existingAd, preparePayload($scope.existingAd));
          $scope.existingAd.put()
            .then(function(res) {
              notify('"' + $scope.existingAd.category + '" ad has been successfully updated. If you would like the test your changes, please navigate to our "Demo" page.');
              $scope.changeSubmitButton = false;
              $scope.ads = Ads.getList().$object;
            });
        } else {
          $scope.updateForm.submitted = $scope.updateForm.$invalid = true;
        }
      };

      /**
       *
       * @param form
       */
      $scope.search = function() {
        var criteria = {};
        if (!_.isEmpty($scope.searchCreteria.category)) criteria.category = $scope.searchCreteria.category;
        if (!_.isEmpty($scope.searchCreteria.screens)) criteria.screens = $scope.searchCreteria.screens;
        if (!_.isEmpty($scope.searchCreteria.template)) criteria.template = $scope.searchCreteria.template;

        if (!_.isEmpty(criteria)) {
          $scope.changeSearchButton = true;
          Search.searchByCriteria(criteria)
            .then(function(res) {
              $scope.changeSearchButton = false;
              if (!_.isEmpty(res)) {
                $scope.searchResults = res.map(function(o) {
                  return {
                    category: o.category,
                    screens: o.screens.join(', '),
                    template: o.template.join(', '),
                    duration: o.duration + ' seconds',
                    startDateTime: moment(o.when.fromDate + ' ' + o.when.fromTime, 'DD/MM/YYYY HH:mm:ss').format('LLLL'),
                    endDateTime: moment(o.when.toDate + ' ' + o.when.toTime, 'DD/MM/YYYY HH:mm:ss').format('LLLL')
                  };
                });
              }
            });
        }
      };

    }]);

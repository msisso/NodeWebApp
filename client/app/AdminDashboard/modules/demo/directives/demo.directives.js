'use strict';

/**
 * [_inRange description]
 * @param  {[type]} when [description]
 * @return {boolean|Boolean}      [description]
 */
var _inRange = function(when) {
  var now = new Date().getTime(),
    from = _convertToDateTime(when.fromDate, when.fromTime).getTime(),
    to = _convertToDateTime(when.toDate, when.toTime).getTime();
  return ((now >= from && now <= to) && (_isToday(when.weekDays)));
};

/**
 * [_isToday description]
 * @param  {[type]}  days [description]
 * @return {Boolean}      [description]
 */
var _isToday = function(days) {
  var today = new Date().getDay(),
    weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days.some(function(day) {
    return ~weekDays.indexOf(day) ? weekDays.indexOf(day) === today : false;
  });
};

/**
 * [_convertToDateTime description]
 * @param  {[type]} date [description]
 * @param  {[type]} time [description]
 * @return {Date}      [description]
 */
var _convertToDateTime = function(date, time) {
  var dateParts = date.split('/');
  var timeParts = time.split(':');
  return new Date(dateParts[2], dateParts[1], dateParts[0], timeParts[0], timeParts[1], timeParts[2]);
};

angular.module('dashboard.demo')
  .directive('adPresenter', ['$interval', function($interval) {
    return {
      restrict: 'AE',
      template: '<p class="template-desc">Using template: {{template}}</p><div ng-include="template"></div><div class="clear">',
      link: function($scope, $element, $attrs) {
        var interval, random;
        $scope.$watch(
          function() {
            return $scope.ads;
          },
          function(newVal, oldVal) {
            if (!_.isEmpty(newVal) && !_.isEqual(newVal, oldVal)) {
              var setTemplateVars = function() {
                if (interval) $interval.cancel(interval);
                random = Math.floor(Math.random() * ($scope.ads.length - 1));

                // Disabled the following check in order to make sure we will get ads during the demo.
                //while (!_inRange($scope.ads[random].when) && ~$scope.ads[random].screens.indexOf($scope.screenId)) {
                //  random = Math.floor(Math.random() * ($scope.ads.length - 1));
                //}

                $scope.template = 'assets/partials/' + $scope.ads[random].template[0].toLowerCase() + '.html';
                $scope.category = $scope.ads[random].category;
                $scope.text = $scope.ads[random].text;
                $scope.images = $scope.ads[random].images;
                interval = $interval(function() {
                  setTemplateVars();
                }, $scope.ads[random].duration * 1000);
              };

              setTemplateVars();
            }
          },
          true
        );

      }
    }
  }]);

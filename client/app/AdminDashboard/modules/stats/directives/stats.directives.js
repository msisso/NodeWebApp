'use strict';

angular.module('dashboard.stats')
  .directive('d3BarsChart', ['$window', '$timeout',
    function($window, $timeout) {
      return {
        restrict: 'A',
        scope: {
          data: '=',
        },
        link: function($scope, $element, $attrs) {
          var renderTimeout;
          var margin = parseInt($attrs.margin) || 20,
            barHeight = parseInt($attrs.barHeight) || 20,
            barPadding = parseInt($attrs.barPadding) || 5;

          var svg = d3.select($element[0])
            .append('svg')
            .style('width', '100%');

          $window.onresize = function() {
            $scope.$apply();
          };

          $scope.$watch(function() {
            return angular.element($window)[0].innerWidth;
          }, function() {
            $scope.render($scope.data);
          });

          $scope.$watch(function() {
            return $scope.data;
          }, function(newData) {
            $scope.render(newData);
          }, true);

          $scope.render = function(data) {
            svg.selectAll('*').remove();

            if (!data) return;
            if (renderTimeout) clearTimeout(renderTimeout);

            renderTimeout = $timeout(function() {
              var width = d3.select($element[0])[0][0].offsetWidth - margin,
                height = $scope.data.length * (barHeight + barPadding),
                color = d3.scale.category20(),
                xScale = d3.scale.linear()
                  .domain([0, d3.max(data, function(d) {
                    return d.count;
                  })])
                  .range([0, width]);

              svg.attr('height', height);

              svg.selectAll('rect')
                .data(data)
                .enter()
                .append('rect')
                .on('click', function(d,i) {
                  return $scope.onClick({item: d});
                })
                .attr('height', barHeight)
                .attr('width', 140)
                .attr('x', Math.round(margin/2))
                .attr('y', function(d,i) {
                  return i * (barHeight + barPadding);
                })
                .attr('fill', function(d) {
                  return color(d.count);
                })
                .transition()
                .duration(1000)
                .attr('width', function(d) {
                  return xScale(d.count);
                });

              svg.selectAll('text')
                .data(data)
                .enter()
                .append('text')
                .attr('fill', '#fff')
                .attr('y', function(d,i) {
                  return i * (barHeight + barPadding) + 15;
                })
                .attr('x', 15)
                .text(function(d) {
                  return d.name + " (count: " + d.count + ")";
                });
            }, 200);
          };
        }}
    }]);

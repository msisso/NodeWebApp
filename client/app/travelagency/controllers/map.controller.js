
angular.module('travelagency')
  .controller('MapsController', function ($scope,socket,$http) {

      $scope.cities = [];

      $http.get('/api/travelagency').success(function(storesArr) {
          $scope.cities = storesArr;
          socket.syncUpdates('store', $scope.citie)

          var mapOptions = {
              zoom: 9,
              //set the center of the map to tel aviv area
              center: new google.maps.LatLng(31.991070,34.775020),
              mapTypeId: google.maps.MapTypeId.TERRAIN
          }
          $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

          $scope.markers = [];

          var infoWindow = new google.maps.InfoWindow();
          $scope.selectedMarker = {};
//create marker for push
          var createMarker = function (info){
              //enter to marker all important parameter longitude latitude store phone and store name
              var marker = new google.maps.Marker({
                  map: $scope.map,
                  position: new google.maps.LatLng(info.lat, info.lon),
                  title: info.name
              });
              marker.content = '<div class="infoWindowContent">' + info.storePhone + '</div>';

              google.maps.event.addListener(marker, 'click', function(){

                  infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
                  $scope.selectedMarker = marker;
                  $scope.$apply();
                  infoWindow.open($scope.map, marker);
              });
              //push the marker to markers array
              $scope.markers.push(marker);

          }
          angular.forEach($scope.cities, function (store, i) {

              createMarker(store);
          })

          $scope.openInfoWindow = function(e, selectedMarker){
              e.preventDefault();
              console.write(selectedMarker);
              google.maps.event.trigger(selectedMarker, 'click');
          }
      })
  });

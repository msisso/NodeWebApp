angular.module('travelagency')
    .controller('travelagencyController', ['$scope','$state','$document','Searchtrav','rest','Agencies','Coords',
        function($scope,$state,$document,Searchtrav,rest,Agencies,Coords) {
            $scope.sections = [
                {name: 'search'}
                , {name: 'Map'}]

            var mapOptions = {
                zoom: 9,
                //set the center of the map to tel aviv area
                center: new google.maps.LatLng(32.075548, 34.774229),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }
            // Create map
            $scope.map = new google.maps.Map(document.getElementById("googlemap"), mapOptions);
            var agencyMarkers = [];

            // Clear markers
            $scope.clearMarkers = function() {
                for(i=0; i<agencyMarkers.length; i++){
                    agencyMarkers[i].setMap(null);
                }
                // Erase markers
                agencyMarkers.length = 0;
            }

            // Add markers to map
            $scope.setMarkes = function (map, data) {
                Coords.getCoordsByAddreess(data.address + ' ' + data.city + ' ' + data.country)
                    .then(function(res){
                        var mapLatLng = new google.maps.LatLng(res.results[0].geometry.location.lat, res.results[0].geometry.location.lng);
                        var marker = new google.maps.Marker({position: mapLatLng,  title: data.agencyName});
                        agencyMarkers.push(marker);
                        marker.setMap(map);
                    });

            }
            $scope.toTheTop = function() {
                $document.scrollTopAnimated(0, 1000);
            }
            $scope.Search = true;
            $scope.searchCreteria = {};
            $scope.searchCreteria.agencyName = '';
            $scope.searchCreteria.city = '';
            $scope.searchCreteria.travelagencyPhone = '';


            Agencies.getAgencies()
                .then(function (res) {
                    $scope.alltravel = res.map(function (value) {

                        json_city = {
                            agencyName: value.agencyName,
                            country: value.country,
                            city: value.city,
                            address: value.address,
                            travelagencyPhone: value.travelagencyPhone

                        };
                        return json_city;
                    });

                    for (var i = 0; i < $scope.alltravel.length; i++) {
                        $scope.setMarkes($scope.map, $scope.alltravel[i]);
                    }

                });

            $scope.Searchtrav = function() {
                var criteria = {};
                if (!_.isEmpty($scope.searchCreteria.travelagencyPhone)) criteria.travelagencyPhone = $scope.searchCreteria.travelagencyPhone;
                if (!_.isEmpty($scope.searchCreteria.agencyName)) criteria.agencyName = $scope.searchCreteria.agencyName;
                if (!_.isEmpty($scope.searchCreteria.city)) criteria.city = $scope.searchCreteria.city;
                if (!_.isEmpty(criteria)) {
                    $scope.changeSearchButton = true;
                    $scope.clearMarkers();
                    Searchtrav.searchBytravel(criteria)
                        .then(function (res) {
                            $scope.changeSearchButton = false;
                            if (!_.isEmpty(res)) {
                                $scope.findresult = 'foundresults';
                                $scope.searchResults = res.map(function (value) {

                                    json_city =  {
                                        agencyName: value.agencyName,
                                        country: value.country,
                                        city: value.city,
                                        address: value.address,
                                        travelagencyPhone: value.travelagencyPhone
                                    };
                                    return json_city;
                                });

                                for (var i = 0; i <$scope.searchResults.length; i++) {
                                    $scope.setMarkes($scope.map, $scope.searchResults[i]);
                                }

                            }
                            else {
                                $scope.findresult = 'notfoundresults';

                            }
                        })
                }

            };
        }]).value('duScrollOffset', 0).value('duScrollActiveClass', 'active');

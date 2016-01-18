angular.module('travelagency')
    .controller('travelagencyController', ['$scope','$state','$document','Searchtrav','getAll','rest','Agencies','Coords',
        function($scope,$state,$document,Searchtrav,getAll,rest,Agencies,Coords) {

            $scope.sections = [
                {name: 'search'}
                , {name: 'Map'}

            ]
            $scope.toTheTop = function() {
                $document.scrollTopAnimated(0, 1000);
            }
            $scope.Search = true;
            $scope.searchCreteria = {};
            $scope.searchCreteria.name = '';
            $scope.searchCreteria.city = '';
            $scope.searchCreteria.active = '';



            $scope.alllist = rest.getList().$object;
            //all the ads to show in the manage section
            $scope.allvalue = [];
            //initilie all the adverts on the manage section
            $scope.AllInit = function()
            {
                getAll.getAll().then(function(res){
                    console.log("enter after the search" + res);
                    if (!_.isEmpty(res)) {
                        angular.forEach(res, function(value, key){
                            console.log("into test: " + key + ": " + value);
                            $scope.allvalue[key] =
                            {
                                name: value.name,
                                city: value.city,
                                address: value.address,
                                travelagencyPhone: value.travelagencyPhone,
                                active: value.active   }
                        });
                    }
                });
            }


            $scope.Searchtrav = function() {
                var criteria = {};
                if (!_.isEmpty($scope.searchCreteria.active)) criteria.active = $scope.searchCreteria.active;
                if (!_.isEmpty($scope.searchCreteria.name)) criteria.name = $scope.searchCreteria.name;
                if (!_.isEmpty($scope.searchCreteria.city)) criteria.city = $scope.searchCreteria.city;
                console.log(criteria);
                if (!_.isEmpty(criteria)) {
                    $scope.changeSearchButton = true;
                    Searchtrav.searchBytravel(criteria)
                        .then(function (res) {
                            console.log("enter after the search" + res);
                            $scope.changeSearchButton = false;
                            if (!_.isEmpty(res)) {
                                $scope.findresult = 'foundresults';
                                $scope.searchResults = res.map(function (value) {
                                    console.log("o: " + value);

                                    return {
                                        name: value.name,
                                        city: value.city,
                                        address: value.address,
                                        travelagencyPhone: value.travelagencyPhone,
                                        active: value.active
                                    };
                                });
                            }
                            else {
                                $scope.findresult = 'notfoundresults';
                                console.log("o: " + $scope.findresult);

                            }
                        })
                }

            };



            $scope.markers = [];
            $scope.map = {center: {latitude: 32.321458, longitude: 34.853196}, zoom: 9};
            Agencies.getAgencies()
                .then(function(markers) {
                    angular.forEach(markers, function(value, key){
                        Coords.getCoordsByAddreess(value.address + ' ' + value.city + ' ' + value.country)
                            .then(function(res){
                                console.log(res.results[0]);
                                var temp = {
                                    coords: {
                                        latitude: res.results[0].geometry.location.lat,
                                        longitude: res.results[0].geometry.location.lng
                                    },
                                    id: res.results[0].place_id
                                };
                                console.log(temp);
                                $scope.markers.push(temp);
                            });

                    });

                });
        }]).value('duScrollOffset', 30).value('duScrollActiveClass', 'active');
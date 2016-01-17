angular.module('travelagency')
    .controller('travelagencyController', ['$scope','$state','$document','Searchtrav','notify','getAll','rest',
        function($scope,$state,$documnet,Searchtrav,notify,getAll,rest) {

            $scope.sections = [
                {name: 'search'}
                , {name: 'Map'}
                ,{name:'Weather' },
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

            }


        }]).value('duScrollOffset', 30).value('duScrollActiveClass', 'active');
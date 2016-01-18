angular.module('AdminDashboard')
    .controller('DashboardController', ['$scope','$location',
            function($scope,$location) {
                $scope.parent = {
                    items:[
                        {name: 'services'},
                        {name: 'trips'},
                        {name: 'about'},
                        {name: 'team'},
                        {name: 'views'}],
                    open: false
                }
                $scope.manageSection = false;
                $scope.demoSection = false;
                $scope.staticsSection = false;
                $scope.navclick = function(sectionName)
                {
                    if(sectionName === 'manage')
                    {
                        if($scope.manageSection)
                        {
                            $scope.manageSection = false;
                        }
                        else {
                            $scope.manageSection = true;
                            $scope.staticsSection = false;
                            $scope.demoSection = false;
                        }

                    }
                    else if(sectionName === 'stats')
                    {
                        if($scope.staticsSection)
                        {
                            $scope.staticsSection = false;
                        }
                        else {
                            $scope.staticsSection = true;
                            $scope.manageSection = false;
                            $scope.demoSection = false;
                        }

                    }
                    else if(sectionName === 'demo'){
                        if($scope.demoSection)
                        {
                            $scope.demoSection = false;
                        }
                        else {
                            $scope.demoSection = true;
                            $scope.staticsSection = false;
                            $scope.manageSection = false;
                        }

                    }
                }


            }]);

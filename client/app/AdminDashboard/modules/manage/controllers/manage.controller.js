

angular.module('dashboard.manage')
  .controller('ManageController', ['$scope','$state','Search',
    function($scope,$state,Search) {

        // set the default states for lions and cranes
        $scope.Create = true;
        $scope.Edit = true;
        $scope.Search = true;

        $scope.searchCreteria = {};
        $scope.searchCreteria.screensId = [];
        $scope.searchCreteria.templateName = '';
        $scope.searchCreteria.msgName = '';

        $scope.search = function() {
            var criteria = {};
            if (!_.isEmpty($scope.searchCreteria.msgName)) criteria.msgName = $scope.searchCreteria.msgName;
            if (!_.isEmpty($scope.searchCreteria.screensId)) criteria.screensId = $scope.searchCreteria.screensId;
            if (!_.isEmpty($scope.searchCreteria.templateName)) criteria.templateName = $scope.searchCreteria.templateName;
            console.log(criteria);
            if (!_.isEmpty(criteria)) {
                $scope.changeSearchButton = true;
                    Search.searchByCriteria(criteria)
                    .then(function(res) {
                        console.log("enter after the search");
                        $scope.changeSearchButton = false;
                        if (!_.isEmpty(res)) {
                            $scope.searchResults = res.map(function(o) {
                                console.log(o);

                                return {
                                    msgName: o.msgName,
                                    screensId: o.screensId.join(', '),
                                    linkTemplate: o.templateName,
                                    duration: (o.advTimer/1000) + ' seconds',
                                    startDateTime: moment(o.when.startDate + ' ' + o.when.startTime, 'MM/DD/YYYY HH:mm:ss').format('LLLL'),
                                    endDateTime: moment(o.when.endDate + ' ' + o.when.endTime, 'MM/DD/YYYY HH:mm:ss').format('LLLL')
                                };
                            });
                        }
                    });
            }
        };

     }]);

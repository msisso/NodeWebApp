

angular.module('dashboard.manage')
  .controller('ManageController', ['$scope','$state','$document','Search','Adverts','getAllAdverts',
    function($scope,$state,$documnet,Search,Adverts,getAllAdverts) {

        // set the default states for box view
        $scope.Create = true;
        $scope.Edit = true;
        $scope.Search = true;


        /*  --------------   Search Section  --------------- */
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
                            $scope.findresult = 'foundresults';
                            $scope.searchResults = res.map(function(o) {
                                console.log("o: " + o);

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
                        else {
                            $scope.findresult = 'notfoundresults';
                        }
                    });
            }
        };
        /*  --------------   Manage Section  --------------- */
        //
        // $scope.ads = Adverts.getList().$object;
        $scope.ads = {};

        $scope.adsToIterate = [];
        $scope.test = function()
        {
            getAllAdverts.getAllAdverts().then(function(res){
                console.log("enter after the search" + res);
                if (!_.isEmpty(res)) {
                    console.log("not empty");
                    angular.forEach(res, function(value, key){
                        console.log("into test: " + key + ": " + value);
                        $scope.adsToIterate[key] =
                        {
                            msgName: value.msgName,
                            screensId: value.screensId.join(', '),
                            linkTemplate: value.templateName,
                            duration: (value.advTimer/1000) + ' seconds',
                            startDateTime: moment(value.when.startDate + ' ' + value.when.startTime, 'MM/DD/YYYY HH:mm:ss').format('LLLL'),
                            endDateTime: moment(value.when.endDate + ' ' + value.when.endTime, 'MM/DD/YYYY HH:mm:ss').format('LLLL')
                        }
                    });
                }
            });
            console.log("ads: " + $scope.ads);
            console.log("sisso");

            console.log($scope.adsToIterate);
        }




    }]);

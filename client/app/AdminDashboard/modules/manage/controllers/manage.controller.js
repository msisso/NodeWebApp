

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

        $scope.ads = Adverts.getList().$object;
        //all the ads to show in the manage section
        $scope.adsToIterate = [];
        //initilie all the adverts on the manage section
        $scope.AllAdvertsInit = function()
        {
            getAllAdverts.getAllAdverts().then(function(res){
                console.log("enter after the search" + res);
                if (!_.isEmpty(res)) {
                        angular.forEach(res, function(value, key){
                        console.log("into test: " + key + ": " + value);
                        $scope.adsToIterate[key] =
                        {
                            _id: value._id,
                            msgName: value.msgName,
                            screensId: value.screensId.join(', '),
                            templateName: value.templateName,
                            duration: (value.advTimer/1000) + ' seconds',
                            startDateTime: moment(value.when.startDate + ' ' + value.when.startTime, 'MM/DD/YYYY HH:mm:ss').format('LLLL'),
                            endDateTime: moment(value.when.endDate + ' ' + value.when.endTime, 'MM/DD/YYYY HH:mm:ss').format('LLLL')
                        }
                    });
                }
            });
        }

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
        $scope.existingAd = {};
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





    }]);

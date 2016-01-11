

angular.module('dashboard.manage')
  .controller('ManageController', ['$scope','$state','$document','Search','Adverts','getAllAdverts','notify',
    function($scope,$state,$documnet,Search,Adverts,getAllAdverts,notify) {


        var preparePayload = function(o) {
            return {
                id: o._id,
                msgName: o.category,
                msgData: o.text,
                advTimer: o.duration,
                screensId: o.screensId,
                templateName: o.templateName,
                linkTemplate: '/assets/templates/' + o.templateName + '.html',
                when: {
                    startTime: moment(o.startDateTime).format('HH:mm:ss'),
                    startDate: moment(o.startDateTime).format('MM/DD/YYYY'),
                    endTime: moment(o.endDateTime).format('HH:mm:ss'),
                    endDate: moment(o.endDateTime).format('MM/DD/YYYY'),
                    daysShow: o.weekDays
                },
                images: []
            };
        };
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
        $scope.existingAd = {};
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
        $scope.existingAd = {};
        /**
         *
         * @param ad
         */
        $scope.existingAd.delete = true;
        $scope.deleteAd = function(ad) {

            $scope.ads = Adverts.one(ad._id).remove();
            if(!_.isEmpty($scope.ads)) {

            }
            $scope.existingAd.delete = false;
        };

        /**
         *
         * @param ad
         */
        //$scope.spinner = false;

        $scope.editAd = function(ad) {
            $scope.showLoaderForId = ad._id;
            //$scope.spinner = true;
            if (_.isEmpty($scope.existingAd) || $scope.existingAd._id !== ad._id) {

                Adverts.one(ad._id).get().then(function(o) {
                    $scope.existingAd = o;
                    $scope.existingAd.edit = !$scope.existingAd.edit;
                    $scope.existingAd.startDateTime = moment(o.when.startDate + ' ' + o.when.startTime, 'MM/DD/YYYY HH:mm:ss').format('LLLL');
                    $scope.existingAd.endDateTime = moment(o.when.endDate + ' ' + o.when.endTime, 'MM/DD/YYYY HH:mm:ss').format('LLLL');
                    $scope.existingAd.weekDays = o.when.daysShow;
                    $scope.existingAd.duration = (o.advTimer/1000);

                });
            } else {
                $scope.existingAd.edit = !$scope.existingAd.edit;
            }

           // $scope.spinner = (!$scope.existingAd || $scope.existingAd._id !== ad._id) && $scope.showLoaderForId === ad._id;
        };


        /**
         *
         * @param form
         */
        $scope.update = function(form) {
            if (isValid(form, $scope.existingAd.duration, $scope.existingAd.startDateTime, $scope.existingAd.endDateTime)) {
                $scope.changeSubmitButton = true;
                $scope.existingAd = _.merge($scope.existingAd, preparePayload($scope.existingAd));
                $scope.existingAd.put()
                    .then(function(res) {
                        notify('"' + $scope.existingAd.category + '" ad has been successfully updated. If you would like the test your changes, please navigate to our "Demo" page.');
                        $scope.changeSubmitButton = false;
                        $scope.ads = Ads.getList().$object;
                    });
            } else {
                $scope.updateForm.submitted = $scope.updateForm.$invalid = true;
            }
        };


    }]);

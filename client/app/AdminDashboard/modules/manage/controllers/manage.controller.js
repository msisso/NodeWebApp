
angular.module('dashboard.manage')
  .controller('ManageController', ['$scope','$state','$document','$timeout','Search','Adverts','getAllAdverts','notify','socket',
    function($scope,$state,$documnet,$timeout,Search,Adverts,getAllAdverts,notify,socket) {


        var preparePayload = function(o) {
            console.log(o.itrData);
            var data = [];
            angular.forEach(o.itrData, function(value, key){
                data.push(value.msgdata);
            });
            return {
                id: o._id,
                msgName: o.msgName,
                msgData: data,
                advTimer: o.advTimer*1000,
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
        var isValid = function(startDateTime, endDateTime) {
            return (moment(endDateTime).isAfter(startDateTime));
        };
        //$scope.ads = Adverts.getList().$object;
        socket.socket.emit('dashboard');


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
                                    linkTemplate: o.templateName.join(', '),
                                    duration: (o.advTimer/1000) + ' seconds',
                                    startDateTime: moment(o.when.startDate + ' ' + o.when.startTime, 'MM/DD/YYYY HH:mm:ss').format('LLLL'),
                                    endDateTime: moment(o.when.endDate + ' ' + o.when.endTime, 'MM/DD/YYYY HH:mm:ss').format('LLLL')
                                };
                            });
                            $scope.searchForm.$setPristine();
                            $scope.searchCreteria.msgName = "";
                            $scope.searchCreteria.screensId = "";
                            $scope.searchCreteria.templateName = "";
                        }
                        else {
                            $scope.findresult = 'notfoundresults';
                        }
                    });
            }
        };
        /*  --------------   Manage Section  --------------- */
        $scope.existingAd = {};

        //all the ads to show in the manage section
        $scope.adsToIterate = [];
        //initilie all the adverts on the manage section
        $scope.AllAdvertsInit = function()
        {
            getAllAdverts.getAllAdverts().then(function(res){
                //console.log("enter after the search" + res);
                if (!_.isEmpty(res)) {
                    //console.log(res);
                        angular.forEach(res, function(value, key){
                            //console.log("into test: " + key + ": " + value.when.startDate + ' ' + value.when.startTime + ' ' + value.when.endDate + ' ' + value.when.endTime);
                            $scope.adsToIterate[key] =
                            {
                                _id: value._id,
                                msgName: value.msgName,
                                screensId: value.screensId.join(', '),
                                templateName: value.templateName.join(', '),
                                advTimer: (value.advTimer/1000) + ' seconds',
                                startDateTime: moment(value.when.startDate + ' ' + value.when.startTime, 'MM/DD/YYYY HH:mm:ss').format('LLLL'),
                                endDateTime: moment(value.when.endDate + ' ' + value.when.endTime, 'MM/DD/YYYY HH:mm:ss').format('LLLL')
                            };
                            //console.log($scope.adsToIterate[key]);
                    });
                }
            });
        }

        socket.syncUpdates('ad', $scope.adsToIterate, function(event, item, array) {
            $scope.adsToIterate = array;
            console.log(array);
        });
        /**
         *
         * @param ad
         */

        $scope.deleteAd = function(ad) {
            $scope.showLoaderForDeleteId = ad._id;
            $timeout(function(){
                $scope.adsToIterate = Adverts.one(ad._id).remove();
            }, 2000);

            /*if(!_.isEmpty($scope.ads)) {
                $timeout(function(){
                    $scope.adsToIterate = [];
                    $scope.AllAdvertsInit();
                }, 2000);

            }*/

        };

        /**
         *
         * @param ad
         */
        //$scope.spinner = false;

        $scope.editAd = function(ad) {
            $scope.showLoaderForId = ad._id;
            console.log(ad._id);
            $scope.updateForm.$setPristine();

            if (_.isEmpty($scope.existingAd) || $scope.existingAd._id !== ad._id) {
                Adverts.one(ad._id).get().then(function(o) {
                    $scope.showLoaderForId = "";
                    //console.log("into test: " + o.when.startDate + ' ' + o.when.startTime + ' ' + o.when.endDate + ' ' + o.when.endTime);
                    $scope.existingAd = o;
                    //create array to itterate the data in input
                    $scope.existingAd.itrData = [];
                    angular.forEach($scope.existingAd.msgData, function(value, key){
                        console.log(value);
                        $scope.existingAd.itrData.push({
                            msgdata: value,
                            name: makeid()
                        });
                    });

                    $scope.existingAd.edit = !$scope.existingAd.edit;




                    $scope.existingAd.startDateTime = moment(o.when.startDate + ' ' + o.when.startTime, 'MM/DD/YYYY HH:mm:ss');
                    $scope.existingAd.endDateTime = moment(o.when.endDate + ' ' + o.when.endTime, 'MM/DD/YYYY HH:mm:ss');
                    $scope.existingAd.weekDays = o.when.daysShow;
                    $scope.existingAd.advTimer = (o.advTimer/1000);

                });
            } else {
                $scope.showLoaderForId = "";
                $scope.existingAd.edit = !$scope.existingAd.edit;
            }
        };
        $scope.addEditMsgDataInput = function () {

            $scope.existingAd.itrData.push({
                msgdata: "",
                name: makeid()
            });
        };

        $scope.removeEditMsgDataInput = function()
        {
            $scope.existingAd.itrData.splice(-1,1);
        }

        $scope.valid = true;
        $scope.ValidationError = [];
        $scope.DateTimeIsValid = true;
        $scope.DateTimeIsChosen = false;


        /**
         *
         * @param form
         */
        $scope.update = function(form) {
            if (isValid($scope.existingAd.startDateTime, $scope.existingAd.endDateTime)) {

                $scope.changeSubmitButton = true;
                var tempUploadAd = preparePayload($scope.existingAd);
                $scope.existingAd.id = tempUploadAd.id;
                $scope.existingAd.msgName = tempUploadAd.msgName;
                $scope.existingAd.msgData = tempUploadAd.msgData;
                $scope.existingAd.when = tempUploadAd.when;
                delete $scope.existingAd.itrData;
                $scope.existingAd.advTimer = tempUploadAd.advTimer;
                $scope.existingAd.screensId = tempUploadAd.screensId;
                $scope.existingAd.templateName = tempUploadAd.templateName;
                $scope.existingAd.linkTemplate = tempUploadAd.linkTemplate;

                //$scope.existingAd = _.merge($scope.existingAd, preparePayload($scope.existingAd));


                console.log("put");
                console.log($scope.existingAd);
                $scope.existingAd.put()
                    .then(function(res) {
                        console.log(res);
                        $scope.existingAd.edit = !$scope.existingAd.edit;
                        notify('"' + $scope.existingAd.msgName + '" ad has been successfully updated. If you would like the test your changes, please navigate to our "Demo" page.');

                        $scope.changeSubmitButton = false;
                        $scope.valid = true;
                        $scope.ValidationError = [];
                        $scope.DateTimeIsChosen = false;
                        $scope.existingAd = {};
                        //$scope.adsToIterate = [];
                        //$scope.AllAdvertsInit();

                    }, function(res) {

                        $scope.valid = false;
                        $scope.ValidationError = res.data;



                    });
            } else {
                $scope.updateForm.submitted = $scope.updateForm.$invalid = true;
                $scope.valid = false;
                $scope.ValidationError = [{ name:'DateTimeRange Error',
                    path:'',
                    message: 'Check again if the range is valid'   }];
            }
        };


        /*  --------------   Create Section  --------------- */
        $scope.newAd = {};
        $scope.$on('$destroy', function() {
            console.log("destroy");
            socket.unsyncUpdates('ad');
        });

        $scope.create = function(form) {
            console.log("before valid " + form);
            if (isValid($scope.newAd.startDateTime, $scope.newAd.endDateTime)) {
                $scope.changeCreateButton = true;
                console.log("before post");
                Adverts.post(preparePayload($scope.newAd))
                    .then(function(res) {
                        console.log("return from create on server");
                        //console.log(res);
                        notify('A new "' + $scope.newAd.msgName + '" ad has been successfully created. Please note that we have automatically added it to your ads inventory. If you would like the test your new ad, please navigate to our "Demo" page.');
                        $scope.changeCreateButton = false;
                        $scope.createForm.$setPristine();
                        $scope.ads = Adverts.getList().$object;
                        $scope.newAd = {};
                        $scope.valid = true;
                        $scope.ValidationError = [];
                        $scope.DateTimeIsChosen = false;
                        //$scope.adsToIterate = [];
                        //$scope.AllAdvertsInit();
                    }, function(res) {

                        $scope.valid = false;
                        if(res.data.code === 11000) {
                            $scope.ValidationError = [{ name:'MongoDbError',
                                                        path:'Message Name',
                                                        message: 'There is already advert with this name, please pick another one'}];
                        }
                        else{
                            $scope.ValidationError = res.data;
                        }


                });
            } else {
                $scope.createForm.$submitted = $scope.createForm.$invalid = true;
                $scope.valid = false;
                $scope.ValidationError = [{ name:'DateTimeRange Error',
                                            path:'',
                                            message: 'Check again if the range is valid'   }];
            }
        };

        $scope.newAd.msgData = [];
        $scope.test = "maor";
        $scope.newAd.msgData.push({
            msgdata: "",
            name: makeid()
        });
        $scope.addCreateMsgDataInput = function () {

            $scope.newAd.msgData.push({
                msgdata: "",
                name: makeid()
            });
        };

        $scope.removeCreateMsgDataInput = function()
        {
            $scope.newAd.msgData.splice(-1,1);
        }
        function makeid()
        {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

            for( var i=0; i < 5; i++ )
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            return text;
        }



        $scope.onTimeSet = function(){
            if(($scope.newAd.startDateTime instanceof Date) && ($scope.newAd.endDateTime instanceof Date))
            {
                $scope.DateTimeIsChosen = true;
                if(!isValid($scope.newAd.startDateTime,$scope.newAd.endDateTime)){
                    console.log("enter not validation " + isValid($scope.newAd.startDateTime,$scope.newAd.endDateTime));
                    $scope.DateTimeIsValid = false;
                }
                else{
                    console.log("enter not validation " + isValid($scope.newAd.startDateTime,$scope.newAd.endDateTime));
                    $scope.DateTimeIsValid = true;
                }

            }
            else{
                $scope.DateTimeIsChosen = false;
            }
        }

        /*$scope.cancelUpdate = function(){
            console.log('existingAd.edit: ' + $scope.existingAd.edit);
            console.log('existingAd: ' + $scope.existingAd);
            console.log('existingAd._id: ' + $scope.existingAd._id);
            console.log('showLoaderForId: ' + $scope.showLoaderForId);
            console.log('existingAd.delete: ' + $scope.existingAd.delete);

            $scope.existingAd.edit = !$scope.existingAd.edit;



            console.log('existingAd.edit: ' + $scope.existingAd.edit);
            console.log('existingAd: ' + $scope.existingAd);
            console.log('existingAd._id: ' + $scope.existingAd._id);
            console.log('showLoaderForId: ' + $scope.showLoaderForId);
            console.log('existingAd.delete: ' + $scope.existingAd.delete);
        }*/
        console.log('existingAd.edit: ' + $scope.existingAd.edit);
        console.log('existingAd: ' + $scope.existingAd);
        console.log('existingAd._id: ' + $scope.existingAd._id);
        console.log('showLoaderForId: ' + $scope.showLoaderForId);
        console.log('existingAd.delete: ' + $scope.existingAd.delete);

    }]);

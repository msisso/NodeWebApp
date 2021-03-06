
angular.module('dashboard.manage')
  .controller('ManageController', ['$scope','$state','$document','$timeout','Search','Adverts','getAllAdverts','notify','socket','FileUploader',
    function($scope,$state,$documnet,$timeout,Search,Adverts,getAllAdverts,notify,socket,FileUploader) {
        //start io connection with server
        socket.socket.emit('dashboard');


        //function to prepare the advert as db model on server
        var preparePayload = function(o) {
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
                msgImage: o.msgImage
            };
        };

        //check if the date range is valid
        var isValid = function(startDateTime, endDateTime) {
            return (moment(endDateTime).isAfter(startDateTime));
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
            if (!_.isEmpty(criteria)) {
                $scope.changeSearchButton = true;
                    Search.searchByCriteria(criteria)
                    .then(function(res) {
                        $scope.changeSearchButton = false;

                        if (!_.isEmpty(res)) {
                            $scope.findresult = 'foundresults';
                            $scope.searchResults = res.map(function(o) {
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

                if (!_.isEmpty(res)) {
                        angular.forEach(res, function(value, key){

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
                    });
                }
            });
        };

        socket.syncUpdates('ad', $scope.adsToIterate, function(event, item, array) {
            $scope.adsToIterate = array;
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
        };

        /**
         *
         * @param ad
         */
        $scope.editAd = function(ad) {
            $scope.showLoaderForId = ad._id;
            $scope.updateForm.$setPristine();


            if (_.isEmpty($scope.existingAd) || $scope.existingAd._id !== ad._id) {
                Adverts.one(ad._id).get().then(function(o) {
                    $scope.showLoaderForId = "";

                    $scope.existingAd = o;
                    //create array to itterate the data in input
                    $scope.existingAd.itrData = [];
                    angular.forEach($scope.existingAd.msgData, function(value, key){

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
        };

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
                $scope.existingAd.msgImage = tempUploadAd.msgImage;
                //$scope.existingAd = _.merge($scope.existingAd, preparePayload($scope.existingAd));


                $scope.existingAd.put()
                    .then(function(res) {
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

        /*  ---------------------------------------------------------- */
        /*  ---------------------------------------------------------- */
        /*  -------------------   Create Section  -------------------- */
        /*  ---------------------------------------------------------- */
        /*  ---------------------------------------------------------- */
        $scope.newAd = {};
        $scope.$on('$destroy', function() {
            socket.unsyncUpdates('ad');
        });
                /*  --------   Image Upload  ------- */
        var uploader = $scope.uploader = new FileUploader({
            url: '/api/ad/upload'

        });

        // FILTERS

        uploader.filters.push({
            name: 'imageFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });




        $scope.create = function(form) {
            if (isValid($scope.newAd.startDateTime, $scope.newAd.endDateTime)) {
                $scope.changeCreateButton = true;
                $scope.newAd.msgImage = [];

                if($scope.uploader.queue.length !== 0){
                    angular.forEach($scope.uploader.queue, function(value, key){
                        $scope.newAd.msgImage.push(value.file.name);
                    });
                }

                Adverts.post(preparePayload($scope.newAd))
                    .then(function(res) {
                        if($scope.uploader.queue.length !== 0){

                            $scope.uploader.uploadAll();

                            $scope.uploader.onCompleteAll = function() {
                                $timeout(function(){
                                    notify('A new "' + $scope.newAd.msgName + '" ad has been successfully created. Please note that we have automatically added it to your ads inventory. If you would like the test your new ad, please navigate to our "Demo" page.');
                                    $scope.changeCreateButton = false;
                                    $scope.createForm.$setPristine();
                                    $scope.ads = Adverts.getList().$object;
                                    $scope.newAd = {};
                                    $scope.valid = true;
                                    $scope.ValidationError = [];
                                    $scope.DateTimeIsChosen = false;
                                    $scope.uploader.clearQueue();
                                }, 2000);
                            };
                        }else{
                            notify('A new "' + $scope.newAd.msgName + '" ad has been successfully created. Please note that we have automatically added it to your ads inventory. If you would like the test your new ad, please navigate to our "Demo" page.');
                            $scope.changeCreateButton = false;
                            $scope.createForm.$setPristine();
                            $scope.ads = Adverts.getList().$object;
                            $scope.newAd = {};
                            $scope.valid = true;
                            $scope.ValidationError = [];
                            $scope.DateTimeIsChosen = false;

                        }




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

        $scope.newAd.itrData = [];

        $scope.newAd.itrData.push({
            msgdata: "",
            name: makeid()
        });
        $scope.addCreateMsgDataInput = function () {

            $scope.newAd.itrData.push({
                msgdata: "",
                name: makeid()
            });
        };

        $scope.removeCreateMsgDataInput = function()
        {
            $scope.newAd.itrData.splice(-1,1);
        };

        //function to make random name for msg data inputs
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
                    $scope.DateTimeIsValid = false;
                }
                else{
                    $scope.DateTimeIsValid = true;
                }

            }
            else{
                $scope.DateTimeIsChosen = false;
            }
        };




    }]);

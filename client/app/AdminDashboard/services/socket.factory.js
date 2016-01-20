/**
 * Created by Maor on 1/9/2016.
 */
angular.module('AdminDashboard')
    .factory('socket', function(socketFactory) {

        var myIoSocket  = io('', {
            path: '/mysocket'
        });

        var socket = socketFactory({
            ioSocket: myIoSocket
        });


        return {
            socket: socket,


            syncUpdates: function(modelName, array, callback) {

                callback = callback || angular.noop;

                /**
                 * Syncs item creation/updates on 'model:save'
                 */
                socket.on(modelName + ':save', function(item) {
                    var oldItem = _.find(array, {_id: item._id});
                    var index = array.indexOf(oldItem);
                    var event = 'created';

                    // replace oldItem if it exists
                    // otherwise just add item to the collection
                    if (oldItem) {

                        array.splice(index, 1, {
                            _id: item._id,
                            msgName: item.msgName,
                            screensId: item.screensId.join(', '),
                            templateName: item.templateName.join(', '),
                            advTimer: (item.advTimer/1000) + ' seconds',
                            startDateTime: moment(item.when.startDate + ' ' + item.when.startTime, 'MM/DD/YYYY HH:mm:ss').format('LLLL'),
                            endDateTime: moment(item.when.endDate + ' ' + item.when.endTime, 'MM/DD/YYYY HH:mm:ss').format('LLLL')
                        });
                        event = 'updated';

                    } else {
                        array.push({
                            _id: item._id,
                            msgName: item.msgName,
                            screensId: item.screensId.join(', '),
                            templateName: item.templateName.join(', '),
                            advTimer: (item.advTimer/1000) + ' seconds',
                            startDateTime: moment(item.when.startDate + ' ' + item.when.startTime, 'MM/DD/YYYY HH:mm:ss').format('LLLL'),
                            endDateTime: moment(item.when.endDate + ' ' + item.when.endTime, 'MM/DD/YYYY HH:mm:ss').format('LLLL')
                        });
                        event = 'created';

                    }

                    callback(event, item, array);
                });

                /**
                 * Syncs removed items on 'model:remove'
                 */
                socket.on(modelName + ':remove', function(item) {
                    var event = 'deleted';
                    _.remove(array, {_id: item._id});
                    callback(event, item, array);
                });
            },

            unsyncUpdates: function(modelName) {
                socket.removeAllListeners(modelName + ':save');
                socket.removeAllListeners(modelName + ':remove');
            }
        };
    });

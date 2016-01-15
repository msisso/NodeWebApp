/**
 * Created by Maor on 1/9/2016.
 */
angular.module('AdminDashboard')
    .factory('socket', function(socketFactory) {

        var ioSocket = io('', {
            path: '/socket.io-client'
        });
        console.log(ioSocket);
        var socket = socketFactory({
            ioSocket: ioSocket
        });

        return {
            socket: socket,

            /**
             * Register listeners to sync an array with updates on a model
             * @param {String} modelName
             * @param {Array} array
             * @param {Function} callback
             */
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
                        array.splice(index, 1, item);
                        event = 'updated';
                    } else {
                        array.push(item);
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

            /**
             * Removes listeners for a models updates on the socket
             *
             * @param modelName
             */
            unsyncUpdates: function(modelName) {
                socket.removeAllListeners(modelName + ':save');
                socket.removeAllListeners(modelName + ':remove');
            }
        };
    });

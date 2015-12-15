

// When the user disconnects.. perform this
function onDisconnect(screen) { }

// When the user connects perform this
function onConnect(screen) {
    require('../api/ad/ad.socket.io').register(screen);

}

module.exports = function (socketio) {
    /*socketio.on('connection', function(client) {
        console.log('Client connected...');

        client.on('join', function(data) {
            console.log(data);
        });

        client.on('messages', function(data) {
            client.emit('broad', data);
            client.broadcast.emit('broad',data);
        });

    });*/
    socketio.on('connection', function (screen) {
        console.log('Client connected...');
        // Call onConnect.
        onConnect(screen);

        // Call onDisconnect.
        screen.on('disconnect', function () {
            onDisconnect(screen);
        });
    });
};
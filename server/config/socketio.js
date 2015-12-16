
var redis = require("redis");
var SetScreen = redis.createClient();

// When the user disconnects.. perform this
function onDisconnect(screen) { console.log("user disconnected")}

// When the user connects perform this
function onConnect(screen,data) {
    require('../api/ad/ad.socket.io').register(screen,data);

}

function onUpdate(screen,data) {
    require('../api/ad/ad.socket.io').update(screen,data);

}

function onDbChanges(screen)
{
    require('../api/ad/ad.socket.io').SendDbChanges(screen,data);
}

module.exports = function (socketio) {

    var clients = [];
    socketio.sockets.on('connection', function (screen) {
        console.log('Client connected...');

        // Call onConnect.

        screen.on('register', function (data) {
            console.log("on connect the id is: " + data );
            var client = {
                SocketId: screen.id,
                ScreenId: data
            }
            clients.push(client);
            SetScreen.sadd(data,screen.id);
            onConnect(screen,data);
        });
        // Call onDisconnect.
        screen.on('disconnect', function () {
            SetScreen.srem(data,screen.id);
            onDisconnect(screen);
        });

        screen.on('updateMe',function(data){
            console.log("on update the id is: " + data);
            onUpdate(screen,data);
        });
    });

};
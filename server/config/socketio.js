
// When the user disconnects.. perform this
function onDisconnect(socket) { console.log("user disconnected")}

// When the user connects perform this
function onConnect(socket,data) {
    require('../api/ad/ad.socket.io').register(socket,data);

}

function onUpdate(socket,data) {
    require('../api/ad/ad.socket.io').update(socket,data);

}

function onDbChanges(socket,data)
{
    require('../api/ad/ad.socket.io').SendDbChanges(socket,data);
}

// When the user connects to admin dashboard perform this
function onDashboardConnect(socket) {
    require('../api/ad/ad.socket.io').dashboardRegister(socket);
}

module.exports = function (socketio) {

    //var clients = [];
    socketio.sockets.on('connection', function (socket) {
        console.log('Client connected...');

        // Call onConnect.
        socket.on('dashboard',function(){
            console.log('Client connected... to dashboard');
            onDashboardConnect(socket);
        });


        socket.on('register', function (data) {
            console.log("on connect the id is: " + data );
            socket.join(data);
            /*var client = {
                SocketId: screen.id,
                ScreenId: data
            }
            clients.push(client);*/
            onConnect(socket,data);
        });
        // Call onDisconnect.
        socket.on('disconnect', function (data) {
            onDisconnect(socket);
        });

        socket.on('updateMe',function(data){
            console.log("on update the id is: " + data);
            onUpdate(socket,data);
        });
        socket.on('newAdCreated',function(data){
            console.log("on create new ad: " + data);
            onDbChanges(socket,data);
        });
    });

};
;
var ads = require('./ad.model.js');
var db = require('./ad.db.js');




exports.dashboardRegister = function(socket){
    ads.schema.post('save', function(doc) {
        console.log("post save");
        onSave(socket, doc);
    });

    ads.schema.post('remove', function(doc) {
        console.log("post remove");
        onRemove(socket, doc);
    });
}

function onSave(socket, doc) {
    socket.emit('ad:save', doc);
}

function onRemove(socket, doc) {
    socket.emit('ad:remove', doc);
}




exports.register = function(socket,data) {

    var callback = function(ads){
        socket.emit('register', ads);
    }

    db.getAdvertisesById(data,callback);


}

exports.update = function(socket,data) {

    var callback = function(ads)
    {
        socket.emit('updateMe', ads);
        //screen.broadcast.emit('update',ads);
    }
    var ads = db.getAdvertisesById(data,callback);

}

exports.SendDbChanges = function(socket,data)
{
    var callback = function(ads)
    {
        socket.broadcast.to(data).emit('serverUpdateInjection', ads);
    }
    var ads = db.getAdvertisesById(data,callback);
}


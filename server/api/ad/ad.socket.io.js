
var ads = require('./ad.model.js');
var db = require('./ad.db.js');



exports.register = function(screen,data) {

    var callback = function(ads){
        screen.emit('register', ads);
    }

    db.getAdvertisesById(data,callback);


}

exports.update = function(screen,data) {

    var callback = function(ads)
    {
        screen.emit('updateMe', ads);
        //screen.broadcast.emit('update',ads);
    }
    var ads = db.getAdvertisesById(data,callback);

}

exports.SendDbChanges = function(screen,data)
{
    var callback = function(ads)
    {
        screen.broadcast.to(data).emit('serverUpdateInjection', ads);
    }
    var ads = db.getAdvertisesById(data,callback);
}


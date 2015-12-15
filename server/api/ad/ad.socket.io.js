

var Ad = require('./ad.model.js');


exports.register = function(screen) {
    var ads = Ad.find({
        screensId: {$in: [screen]}}).select({
        "msgName":1,
        "linkTemplate":1,
        "advTimer":1,
        "_id":0,
        "id": 1,
        "when":1,
        "msgImage":1,
        "msgData":1});

    ads.exec(function (err, ads) {
        if(err) { return handleError(res, err); }
        screen.emit('broad', ads);
        screen.broadcast.emit('broad',ads);
    });
    /*Ad.schema.post('save', function(doc) {
        onSave(screen, doc);
    });
    Ad.schema.post('remove', function(doc) {
        onRemove(screen, doc);
    });*/
}

function onSave(screen, doc, cb) {
    screen.emit('ad:save', doc);
}

function onRemove(screen, doc, cb) {
    screen.emit('ad:remove', doc);
}
/**
 * Created by Maor on 12/15/2015.
 */

var Ad = require('./ad.model.js');

exports.getAdvertisesById = function(id,callback)
{
    var ads = Ad.find({
        screensId: {$in: [id]}}).select({
        "msgName":1,
        "linkTemplate":1,
        "advTimer":1,
        "_id":0,
        "id": 1,
        "when":1,
        "msgImage":1,
        "msgData":1});

    ads.exec(function (err, ads) {
        if(err) { return err; }
        callback(ads);
    });
}

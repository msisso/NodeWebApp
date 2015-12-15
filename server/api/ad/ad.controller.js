var fs = require('fs');
var Ad = require('./ad.model.js');
var app = require('../../../app');

exports.showAdvertise = function(req, res) {
    console.log("showAdvertises");
    console.log(req.id);
    if(req.id >= 1 && req.id <= 3)
    {
        res.sendFile(app.get('clientPath') + '/index.html');
    }
    else{
        res.sendFile(app.get('serverPath') + '/views/Errors/404.html');
    }
};

exports.updateJson = function(req, res){
    console.log("updatesFromServer " + req.params.id);

    var ads = Ad.find({
        screensId: {$in: [req.params.id]}}).select({
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
        res.json(ads);
    });

}

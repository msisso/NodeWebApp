var fs = require('fs');
var Ad = require('./ad.model.js');
var app = require('../../../app');

exports.showAdvertise = function(req, res) {
    console.log("showAdvertises");
    console.log(req.params.id);
    if(req.params.id >= 1 && req.params.id <= 3)
    {
        res.sendFile(app.get('clientPath') + '/app/index.html');
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

exports.sendHtmlUpdate = function(req,res)
{
    console.log("this is the screen id: " + req.query.id);
    res.sendFile(app.get('clientPath') + '/app/AdUpdate.html');

}
// Updates an existing ad in the DB.
exports.update = function(req, res) {
    var user_name=req.body.user;
    var password=req.body.password;
    console.log("User name = "+user_name+", password is "+password);
    res.end("done");
};

// Creates a new ad in the DB.
exports.create = function(req, res) {
    console.log("create " + req.body);
    Ad.create(req.body, function(err, ad) {
        if(err) { return err; }
        res.json(ad);
    });
};
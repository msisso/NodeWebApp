var fs = require('fs');
var Ad = require('./ad.model.js');
var app = require('../../../app');

function onNewCreate(screen,data) {
    require('../api/ad/ad.socket.io').update(screen,data);

}

exports.showAdvertise = function(req, res) {
    console.log("showAdvertises");
    console.log(req.params.id);
    if(req.params.id >= 1 && req.params.id <= 4)
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
        if(err) { return err;}
        res.json(ads);
    });

}

exports.sendHtmlUpdate = function(req,res)
{
    console.log("screen id: " + req.query.id);
    /*console.log("this is the screen id: " + req.query.id);*/
    var callback = function(){
        res.sendFile(app.get('clientPath') + '/app/TestUpdate.html');
    }
    Ad.create({
        msgName: "Flights Discount Message",
        msgData: ["Don't Miss The Chance To Visit Israel",
            "Discover the beauty of Tel Aviv",
            "Flights to Croatia from 400$",
            "Connections Flights is also fun"
        ],
        msgImage: ["flight1.jpg", "telAviv-israel.jpg"],
        linkTemplate: "assets/templates/TemplateOne.html",
        advTimer: "40000",
        when: { startDate: "01/01/2015",
            endDate: "12/31/2016",
            daysShow: ["monday"],
            srartTime: "13:00:00",
            endTime: "23:00:00"},
        screensId: [4]
    },callback);

}


/*exports.sendHtmlUpdate = function(req,res)
{
    console.log("this is the screen id: " + req.query.id);
    res.sendFile(app.get('clientPath') + '/app/AdUpdate.html');
}*/

// Creates a new ad in the DB.
exports.create = function(req, res) {
    console.log("create " + req.body);
    Ad.create(req.body, function(err,ad) {

        if(err) { return err; }

        res.status(201).json(ad);
    });
};


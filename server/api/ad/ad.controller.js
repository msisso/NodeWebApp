var fs = require('fs');
var Ad = require('./ad.model.js');
//var upload = require('jquery-file-upload-middleware');
//var busboy = require('connect-busboy');
var app = require('../../../app');

function onNewCreate(screen,data) {
    require('../api/ad/ad.socket.io').update(screen,data);
}

//exports.showAdvertise = function(req, res) {
//    console.log("showAdvertises");
//    console.log(req.params.id);
//    if(req.params.id >= 1 && req.params.id <= 4)
//    {
//        res.sendFile(app.get('clientPath') + '/app/index.html');
//    }
//    else{
//        res.sendFile(app.get('serverPath') + '/views/Errors/404.html');
//    }
//};
//
//exports.updateJson = function(req, res){
//    console.log("updatesFromServer " + req.params.id);
//
//    var ads = Ad.find({
//        screensId: {$in: [req.params.id]}}).select({
//        "msgName":1,
//        "linkTemplate":1,
//        "advTimer":1,
//        "_id":0,
//        "id": 1,
//        "when":1,
//        "msgImage":1,
//        "msgData":1});
//
//    ads.exec(function (err, ads) {
//        if(err) { return err;}
//        res.json(ads);
//    });
//
//}
//
//exports.TestUpdateScreen4 = function(req,res)
//{
//    console.log("screen id: " + req.query.id);
//    /*console.log("this is the screen id: " + req.query.id);*/
//    var callback = function(){
//        res.sendFile(app.get('clientPath') + '/app/TestUpdate.html');
//    }
//    Ad.create({
//        msgName: "Flights Discount Message",
//        msgData: ["Don't Miss The Chance To Visit Israel",
//            "Discover the beauty of Tel Aviv",
//            "Flights to Croatia from 400$",
//            "Connections Flights is also fun"
//        ],
//        msgImage: ["flight1.jpg", "telAviv-israel.jpg"],
//        linkTemplate: "assets/templates/A.html",
//        advTimer: "40000",
//        when: { startDate: "01/01/2015",
//            endDate: "12/31/2016",
//            daysShow: ["monday"],
//            srartTime: "13:00:00",
//            endTime: "23:00:00"},
//        screensId: [4]
//    },callback);
//
//}
//
//
//exports.sendHtmlUpdate = function(req,res)
//{
//    console.log("this is the screen id: " + req.query.id);
//    res.sendFile(app.get('clientPath') + '/app/AdUpdate.html');
//}
//


// Get list of ads
exports.index = function(req, res) {
    Ad.find(function (err, ads) {
        if(err) {
            return handleError(res, err);
        }
        res.status(201).json(ads);
    });
};

// Get a single ad
exports.show = function(req, res) {
    Ad.findById(req.params.id, function (err, ad) {
        if(err) {
            return handleError(res, err);
        }
        if(!ad) {
            return res.status(404);
        }
        res.json(ad);
    });
};

// Creates a new ad in the DB.
exports.create = function(req, res) {

    Ad.create(req.body, function(err, ad) {

        if(err) {
            /*console.log(err.errors.msgName.message);
            console.log(String(err.errors.msgName));
            console.log(err.errors.msgName.kind);
            console.log(err.errors.msgName.path);
            console.log(err.errors.msgName.value);
            console.log(err.name);
            console.log(err.message);*/
            //var error = err.name ;//+ ': ' + err.errors.(err.name).message;
            console.log(err);
            console.log(err.errors);
            if(typeof err.errors != 'undefined'){
                return handleError(res, err.errors);
            }
            else{
                return handleError(res, err);
            }

        }
        res.status(201).json(ad);
    });
};

// Updates an existing ad in the DB.
exports.update = function(req, res) {
    var query = {"_id":req.params.id};
    var options = {new: true};
    var updated = new Ad();
    updated._id = req.params.id;
    updated.msgName = req.body.msgName;
    updated.msgData = req.body.msgData;
    updated.advTimer = req.body.advTimer;
    updated.screensId = req.body.screensId;
    updated.templateName = req.body.templateName;
    updated.linkTemplate = req.body.linkTemplate;
    updated.when = req.body.when;
    updated.msgImage = req.body.msgImage;
    Ad.findOneAndUpdate(query, updated, options, function(err,ad) {
        if(err){
            console.log(err);
            return handleError(res, err);
        }
        else{
            //for trigger the post save function
            ad.save();
            return res.status(200).json(ad);
        }
    });
};

// Deletes a ad from the DB.
exports.destroy = function(req, res) {
    Ad.findById(req.params.id, function (err, ad) {
        if(err) {
            return handleError(res, err);
        }
        if(!ad) {
            return res.status(404);
        }
        ad.remove(function(err) {
            if(err) {
                return handleError(res, err);
            }
            return res.status(204);
        });
    });
};

exports.upload = function (req,res){

    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading: " + filename);

        //Path where image will be uploaded
        fstream = fs.createWriteStream(app.get('clientPath') + '/assets/public/imgUploaded/' + filename);
        file.pipe(fstream);
        fstream.on('close', function () {
            console.log("Upload Finished of " + filename);
            res.redirect('back');
        });
    });
};



function handleError(res, err) {
    return res.status(500).send(err);
}


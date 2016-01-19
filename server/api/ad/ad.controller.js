var fs = require('fs');
var Ad = require('./ad.model.js');
var app = require('../../../app');




// Get list of ads
exports.index = function(req, res) {
    Ad.find(function (err, ads) {
        if(err) {
            return handleError(res, err);
        }
        res.status(201).json(ads);
    });
};

exports.stats = function(req, res) {

    var groupByField = '$'.concat(req.query.by);
    Ad.aggregate([
        {
            $unwind: groupByField
        },
        {
            $group: {
                _id: groupByField,
                items: {
                    $push: '$$ROOT'
                }
            }
        }
    ], function(err, stats) {
        if (err) { return handleError(res, err); }
        return res.status(200).json(stats);
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

//upload image
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


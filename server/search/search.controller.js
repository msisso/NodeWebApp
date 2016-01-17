
var Ads = require('../api/ad/ad.model.js');
var TravelAgency = require('../api/travelagency/travelagency.model.js');
// Get list of ads
exports.index = function(req, res) {

    var query = Ads.find({});


    if(typeof req.body.searchparams.msgName !== 'undefined'){
        console.log("add to query msgName");
        query.where({'msgName': new RegExp(req.body.searchparams.msgName, "i")});
    }
    if(typeof req.body.searchparams.templateName !== 'undefined'){
        console.log("add to query templateName");

        query.where('templateName').in(req.body.searchparams.templateName);
    }
    if(typeof req.body.searchparams.screensId  !== 'undefined'){
        console.log("add to query screensId");

        query.where('screensId').all(req.body.searchparams.screensId);
    }

    query.exec(function(err,ads){
        if (err) { return handleError(res, err); }
        return res.status(200).json(ads);
    });



};

exports.get = function(req, res) {

    TravelAgency.find(req.body.searchparams, function(err, stats) {
        if (err) { return handleError(res, err); }
        return res.status(200).json(stats);
    })

};

function handleError(res, err) {
    return res.status(500).json(err);
}


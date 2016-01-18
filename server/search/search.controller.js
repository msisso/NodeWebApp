
var Ads = require('../api/ad/ad.model.js');
var TravelAgency = require('../api/travelagency/travelagency.model.js');
// Get list of ads
exports.index = function(req, res) {

    var query = Ads.find({});

    if(typeof req.body.searchparams.msgName !== 'undefined'){
        query.where({'msgName': new RegExp(req.body.searchparams.msgName, "i")});
    }
    if(typeof req.body.searchparams.templateName !== 'undefined'){
        query.where('templateName').in(req.body.searchparams.templateName);
    }
    if(typeof req.body.searchparams.screensId  !== 'undefined'){
        query.where('screensId').all(req.body.searchparams.screensId);
    }

    query.exec(function(err,ads){
        if (err) { return handleError(res, err); }
        return res.status(200).json(ads);
    });



};

exports.get = function(req, res) {
    var querytravel = TravelAgency.find({});

    if(typeof req.body.searchparams.name !== 'undefined'){
        console.log("add to query name");
        console.log(req.body.searchparams.name);
        querytravel.where({'name': new RegExp(req.body.searchparams.name, "i")});
    }
    if(typeof req.body.searchparams.active !== 'undefined'){
        console.log("add to query active");
        querytravel.where({'active': new RegExp(req.body.searchparams.active, "i")});
    }
    if(typeof req.body.searchparams.city  !== 'undefined'){
        console.log("add to query city");
        querytravel.where({'city': new RegExp(req.body.searchparams.city, "i")});    }

    querytravel.exec(function(err,stats){
        if (err) { return handleError(res, err); }
        return res.status(200).json(stats);
    });


};


function handleError(res, err) {
    return res.status(500).json(err);
}


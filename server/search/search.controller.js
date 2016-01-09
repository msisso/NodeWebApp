/**
 * Created by Maor on 1/8/2016.
 */



var _ = require('lodash');
var Ads = require('../api/ad/ad.model.js');

// Get list of ads
exports.index = function(req, res) {
    console.log("maor" +req.body.searchparams);
    console.log("maor" +req.query);
    console.log("maor" +req.query.searchparams);
    Ads.find(req.body.searchparams, function(err, stats) {
        if (err) { return handleError(res, err); }
        return res.status(200).json(stats);
    });
};

function handleError(res, err) {
    return res.status(500).json(err);
}


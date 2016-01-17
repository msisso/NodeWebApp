
var Ad = require('../ad/ad.model.js');

// Get list of ads
exports.index = function(req, res) {
    console.log(req.query.by);
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


function handleError(res, err) {
    return res.status(500).send(err);
}

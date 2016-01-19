'use strict';
var _ = require('lodash');
var travelagency = require('./travelagency.model.js');

// Get list of travelagencys
exports.agencies = function(req, res) {
  travelagency.find(function (err, travelagencys) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(travelagencys);
  });
};
function handleError(res, err) {
  return res.send(500, err);
}

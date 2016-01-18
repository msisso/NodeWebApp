'use strict';
var _ = require('lodash');
var travelagency = require('./travelagency.model.js');

// Get list of travelagencys
exports.index = function(req, res) {
  travelagency.find(function (err, travelagencys) {
    if(err) { return handleError(res, err); }
    return res.json(200, travelagencys);
  });
};
// Get list of travelagencys
exports.agencies = function(req, res) {
  console.log("get agencies");
  travelagency.find(function (err, travelagencys) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(travelagencys);
  });
};


// Get a single travelagency
exports.show = function(req, res) {
  travelagency.findById(req.params.id, function (err, travelagency) {
    if(err) { return handleError(res, err); }
    if(!travelagency) { return res.send(404); }
    return res.json(travelagency);
  });
};

// Creates a new travelagency in the DB.
exports.create = function(req, res) {
  travelagency.create(req.body, function(err, travelagency) {
    if(err) { return handleError(res, err); }
    return res.json(201, travelagency);
  });
};

exports.putUpdatetravelagency = function(req, res, next) {
  travelagency.findById(req.travelagency._id, function(err, travelagency) {
    if (err) return next(err);
    travelagency.lat = Number(req.body.lat) || '';
    travelagency.lon = Number(req.body.lon) || '';
    travelagency.travelagencyPhone = Number(req.body.travelagencyPhone) || '';
    travelagency.name = req.body.name || '';

    // Save changes to db
    travelagency.save(function(err) {
      if (err) validationError(res, err);
      res.status(200).send({response: "Changed Successfully"});
    });
  });
};

// Updates an existing travelagency in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  travelagency.findById(req.params.id, function (err, travelagency) {
    if (err) { return handleError(res, err); }
    if(!travelagency) { return res.send(404); }
    var updated = _.merge(travelagency, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, travelagency);
    });
  });
};

// Deletes a travelagency from the DB.
exports.destroy = function(req, res) {
  travelagency.findById(req.params.id, function (err, travelagency) {
    if(err) { return handleError(res, err); }
    if(!travelagency) { return res.send(404); }
    travelagency.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}

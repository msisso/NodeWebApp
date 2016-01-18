'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var travelagencySchema = new Schema({
  id: Number,
  agencyName:String,
  city:String,
  address:String,
  country:String,
  travelagencyPhone:String,
  active: Boolean
});

module.exports = mongoose.model('travelagency', travelagencySchema, 'Travelagency');




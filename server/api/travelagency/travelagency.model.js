'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var travelagencySchema = new Schema({
  name:String,
  city:String,
  address:String,
  travelagencyPhone:String,
  lat:Number,
  lon:Number,
  active: Boolean
});

module.exports = mongoose.model('travelagency', travelagencySchema, 'Travelagency');




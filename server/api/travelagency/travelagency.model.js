'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var travelagencySchema = new Schema({
  id: Number,
  name:String,
  city:String,
  address:String,
  country:String,
  travelagencyPhone:String,
  coords: Schema.Types.Mixed,
  active: Boolean
});

module.exports = mongoose.model('travelagency', travelagencySchema, 'Travelagency');




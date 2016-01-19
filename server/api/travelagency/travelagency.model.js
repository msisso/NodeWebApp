'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var travelagencySchema = new Schema({

  agencyName:{
    type: String,
    trim: true
  },
  city:{
    type: String,
    trim: true
  },
  address:{
    type: String,
    trim: true
  },
  country:{
    type: String,
    trim: true
  },
  travelagencyPhone:{
    type: String,
    trim: true
  }
});

module.exports = mongoose.model('travelagency', travelagencySchema, 'Travelagency');




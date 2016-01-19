'use strict';

var express = require('express');
var controller = require('./travelagency.controller.js');
var router = express.Router();


router.get('/agencies', controller.agencies);

module.exports = router;

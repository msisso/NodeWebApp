/**
 * Created by Maor on 1/8/2016.
 */


var express = require('express');
var controller = require('./search.controller.js');
var router = express.Router();

router.get('/:resource', controller.index);
router.post('/:resource', controller.index);
module.exports = router;
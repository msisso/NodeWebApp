
var express = require('express');
var controller = require('./ad.controller.js');
var router = express.Router();


router.get('/', controller.showAdvertise);
router.get('/:id', controller.updateJson);



module.exports = router;

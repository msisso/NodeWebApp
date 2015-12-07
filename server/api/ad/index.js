
var express = require('express');
var controller = require('./ad.controller.js');
var router = express.Router();


router.get('/screen=:id', controller.showAdvertise);
router.get('/ServerUpdate/:id', controller.updateJson);
router.get('/*', controller.PageNotFound);


module.exports = router;

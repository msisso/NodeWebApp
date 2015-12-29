
var express = require('express');
var controller = require('./ad.controller.js');
var router = express.Router();


router.get('/screen=:id', controller.showAdvertise);
router.get('/ad/updatesFromServer/:id', controller.updateJson);
router.get('/TestUpdate', controller.TestUpdateScreen4);
router.get('/manage', controller.sendHtmlUpdate);
//router.post('/TestUpdate', controller.create);
//router.put('/TestUpdate', controller.update);

module.exports = router;

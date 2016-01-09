
var express = require('express');
var controller = require('./ad.controller.js');
var router = express.Router();


router.get('/screen=:id', controller.showAdvertise);
router.get('/ad/updatesFromServer/:id', controller.updateJson);
router.get('/TestUpdate', controller.TestUpdateScreen4);
router.get('/manage', controller.sendHtmlUpdate);
//router.post('/TestUpdate', controller.create);
//router.put('/TestUpdate', controller.update);
router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;

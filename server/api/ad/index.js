
var express = require('express');
var controller = require('./ad.controller.js');
var router = express.Router();


//router.get('/screen=:id', controller.showAdvertise);
//router.get('/ad/updatesFromServer/:id', controller.updateJson);
//router.get('/TestUpdate', controller.TestUpdateScreen4);
//router.get('/manage', controller.sendHtmlUpdate);

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.post('/upload', controller.upload);



module.exports = router;


var express = require('express');
var controller = require('./ad.controller.js');
var router = express.Router();



router.get('/', controller.index);
router.get('/stats', controller.stats);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
/*
router.patch('/:id', controller.update);
*/
router.delete('/:id', controller.destroy);
router.post('/upload', controller.upload);



module.exports = router;

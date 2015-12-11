
var express = require('express');
var controller = require('./ad.controller.js');
var router = express.Router();

/*router.param('id', function(request, response, next, id) {
    console.log(
        'Username param was is detected: ',
        id
    )
    requert.id = id;
});*/

router.get('/', controller.showAdvertise);
router.get('/:id', controller.updateJson);



module.exports = router;

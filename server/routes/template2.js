/**
 * Created by Maor on 11/28/2015.
 */
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('template2');
});

module.exports = router;
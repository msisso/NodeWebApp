/**
 * Created by Maor on 11/28/2015.
 */

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('template1', advertises);
   // res.send('template1');
});

module.exports = router;

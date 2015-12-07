var express = require('express');
var path = require('path');
var fs = require('fs');
//var index = require('./server/api/ad/index');

var app = express();
require('./routes')(app);
app.use(express.static('client/assets'));


app.set('views', path.join(__dirname, '/server/views'));
app.set('view engine', 'jade');


var server = app.listen(8080, 'localhost' ,function () {

    var host = server.address().address
    var port = server.address().port

    console.log("Server listening at http://%s:%s", host, port)

})

// Expose app
var exports = module.exports = app;
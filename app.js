var express = require('express');
var mongoose = require('mongoose');
var app = express();

mongoose.connect('mongodb://localhost/MaorMongo');
require('./server/config/MongoDataInjection');

require('./server/config/express')(app);

require('./routes')(app);


var server = app.listen(8080, 'localhost' ,function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Server listening at http://%s:%s", host, port)
})

// Expose app
var exports = module.exports = app;


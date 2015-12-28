var express = require('express');
var mongoose = require('mongoose');
var app = module.exports = express();

mongoose.connect('mongodb://localhost/Flights');
require('./server/config/MongoDataInjection');

var server = require('http').createServer(app);
var socketio = require('socket.io')(server);

require('./server/config/socketio')(socketio);
require('./server/config/express')(app);
require('./routes')(app);

// Start server
server.listen(8080, 'localhost', function() {
    var host = server.address().address
    var port = server.address().port
    console.log('Express server listening on %d, in %s mode', port, host);
});
/*
var server = app.listen(8080, 'localhost' ,function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Server listening at http://%s:%s", host, port)
})*/



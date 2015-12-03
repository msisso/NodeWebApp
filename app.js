var express = require('express');
var path = require('path');
var fs = require('fs');
var app = express();

app.use(express.static('client/assets'));
console.log(__dirname);
//app.set('views', path.join(__dirname, 'views'));
var template1 = require('./server/routes/template1');
var template2 = require('./server/routes/template2');
var template3 = require('./server/routes/template3');
var noValids = require('./server/routes/noValids');
var ErrorPage = require('./server/routes/noValids');
/*app.get('/', function (req, res) {
    res.send('Hello World');
})*/
// view engine setup
console.log(path.join(__dirname, '/server/views'));
app.set('views', path.join(__dirname, '/server/views'));
app.set('view engine', 'jade');
///////////////////////////////////////////////////////////////

// This responds with "Hello World" on the homepage
app.get('/', function (req, res) {
    console.log("Got a GET request for the homepage");
    res.send('Hello GET');
})


// This responds a GET request for abcd, abxcd, ab123cd, and so on
app.get('/screen=:templateId', function(req, res) {


    var advertises = JSON.parse(fs.readFileSync('./server/api/advertises.json'));
    var advertiseToShow = [];
    if(req.params.templateId == 1)
    {
        for(var i=0;i<advertises.length;i++)
        {
            if (advertises[i].id.indexOf("1") > -1) {
                advertiseToShow.push(advertises[i]);
            }
        }
        res.render('index', { advertise: advertiseToShow });
    }
    else if(req.params.templateId == 2)
    {
        for(var i=0;i<advertises.length;i++)
        {
            if (advertises[i].id.indexOf("2") > -1) {
                advertiseToShow.push(advertises[i]);
            }
        }
        res.render('index', { advertise: advertiseToShow });
    }
    else if(req.params.templateId == 3)
    {
        for(var i=0;i<advertises.length;i++)
        {
            if (advertises[i].id.indexOf("3") > -1) {
                advertiseToShow.push(advertises[i]);
            }
        }
        res.render('index', { advertise: advertiseToShow });
    }
    else
    {
        res.sendFile( path.join(__dirname, '/client/assets/templates/404.html'));
    }


})



var server = app.listen(8081, 'localhost' ,function () {

    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)

})
var express = require('express');
var path = require('path');
var fs = require('fs');
var app = express();

app.use(express.static('client/assets'));
console.log(__dirname);
//app.set('views', path.join(__dirname, 'views'));
var template1 = require('./routes/template1');
var template2 = require('./routes/template2');
var template3 = require('./routes/template3');
var noValids = require('./routes/noValids');
/*app.get('/', function (req, res) {
    res.send('Hello World');
})*/
// view engine setup
console.log(path.join(__dirname, 'views'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
///////////////////////////////////////////////////////////////

// This responds with "Hello World" on the homepage
app.get('/', function (req, res) {
    console.log("Got a GET request for the homepage");
    res.send('Hello GET');
})

// This responds a POST request for the homepage
app.post('/', function (req, res) {
    console.log("Got a POST request for the homepage");
    res.send('Hello POST');
})

// This responds a DELETE request for the /del_user page.
app.delete('/del_user', function (req, res) {
    console.log("Got a DELETE request for /del_user");
    res.send('Hello DELETE');
})

// This responds a GET request for the /list_user page.
app.get('/list_user', function (req, res) {
    console.log("Got a GET request for /list_user");
    res.send('Page Listing');
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
    }
    else if(req.params.templateId == 2)
    {
        for(var i=0;i<advertises.length;i++)
        {
            if (advertises[i].id.indexOf("2") > -1) {
                advertiseToShow.push(advertises[i]);
            }
        }
    }
    else if(req.params.templateId == 3)
    {
        for(var i=0;i<advertises.length;i++)
        {
            if (advertises[i].id.indexOf("3") > -1) {
                advertiseToShow.push(advertises[i]);
            }
        }
    }
    else
    {
        res.send('Unknow request');
    }

    res.render('index', { advertise: advertiseToShow });

})
/*app.use('/screen=1', template1);
app.use('/screen=2', template2);
app.use('/screen=3', template3);*/
////////////////////////////////////////////////////////////////


app.get('/index', function (req, res) {
    res.sendFile( __dirname + "/" + "index.html" );
})

app.get('/process_get', function (req, res) {

    // Prepare output in JSON format
    response = {
        first_name:req.query.first_name,
        last_name:req.query.last_name
    };
    console.log(response);
   //res.end(JSON.stringify(response));
    res.render()
})

//////////////////////////////////////////////////////


var server = app.listen(8081, 'localhost' ,function () {

    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)

})
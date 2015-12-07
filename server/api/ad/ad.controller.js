var path = require('path');
var fs = require('fs');


exports.showAdvertise = function(req, res) {
    var advertises = JSON.parse(fs.readFileSync('./server/api/ad/advertises.json'));
    var advertiseToShow = [];
    if(req.params.id == 1)
    {
        for(var i=0;i<advertises.length;i++)
        {
            if (advertises[i].id.indexOf("1") > -1) {
                advertiseToShow.push(advertises[i]);
            }
        }
        res.render('index', { advertise: JSON.stringify(advertiseToShow)});
    }
    else if(req.params.id == 2) {
        for (var i = 0; i < advertises.length; i++) {
            if (advertises[i].id.indexOf("2") > -1) {
                advertiseToShow.push(advertises[i]);
            }
        }
        res.render('index', {advertise: JSON.stringify(advertiseToShow)});
    }
    else if(req.params.id == 3)
    {
        for(var i=0;i<advertises.length;i++)
        {
            if (advertises[i].id.indexOf("3") > -1) {
                advertiseToShow.push(advertises[i]);
            }
        }
        res.render('index', { advertise: JSON.stringify(advertiseToShow)});
    }
    else
    {
        res.render('Errors/404');
    }
};

exports.updateJson = function(req, res){
    var advertises = JSON.parse(fs.readFileSync('./server/api/ad/advertises.json'));
    var advertiseToShow = [];
    if(req.params.id == 1)
    {
        for(var i=0;i<advertises.length;i++)
        {
            if (advertises[i].id.indexOf("1") > -1) {
                advertiseToShow.push(advertises[i]);
            }
        }
        res.json(advertiseToShow);
    }
    else if(req.params.id == 2) {
        for (var i = 0; i < advertises.length; i++) {
            if (advertises[i].id.indexOf("2") > -1) {
                advertiseToShow.push(advertises[i]);
            }
        }
        res.json(advertiseToShow);

    }
    else if(req.params.id == 3)
    {
        for(var i=0;i<advertises.length;i++)
        {
            if (advertises[i].id.indexOf("3") > -1) {
                advertiseToShow.push(advertises[i]);
            }
        }
        res.json(advertiseToShow);
    }
}

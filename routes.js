

module.exports = function(app) {
    /*app.param('id', function(request, response, next, id) {

        //console.log('detected: ', id)
        request.id = id;
        next();
    });*/

    app.use('/api/ad', require('./server/api/ad'));
    //app.use('/screen=:id', require('./server/api/ad'));
    //app.use('/ad/updatesFromServer', require('./server/api/ad'));
    //app.use('TestUpdate', require('./server/api/ad'));
    app.use('/search', require('./server/search'));




   app.route('/*').get(function(req, res) {
        res.sendFile(app.get('clientPath') + '/index.html');
   });

};
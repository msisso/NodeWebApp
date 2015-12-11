

module.exports = function(app) {
    app.param('id', function(request, response, next, id) {

        //console.log('detected: ', id)
        request.id = id;
        next();
    });


    app.use('/screen=:id', require('./server/api/ad'));
    app.use('/ad/updatesFromServer', require('./server/api/ad'));

    app.route('/*').get(function(req, res) {
        res.render('Errors/404');
    });

};
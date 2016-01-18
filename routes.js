

module.exports = function(app) {


    app.use('/api/ad', require('./server/api/ad'));
    app.use('/api/travelagency', require('./server/api/travelagency'));

    //app.use('/screen=:id', require('./server/api/ad'));
    //app.use('/ad/updatesFromServer', require('./server/api/ad'));
    //app.use('TestUpdate', require('./server/api/ad'));
    app.use('/api/stats', require('./server/api/stats'));

    app.use('/search', require('./server/search'));




   app.route('/*').get(function(req, res) {
        res.sendFile(app.get('clientPath') + '/index.html');
   });

};
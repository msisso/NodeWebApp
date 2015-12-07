

var errors = require('./server/components/errorsHandler');

module.exports = function(app) {
    app.use('/', require('./server/api/ad'));



    // All undefined asset or api routes should return a 404
    app.route('/:url(api|assets)/*').get(errors[404]);

    // All other routes should redirect to the index.html
   /* app.route('/*').get(function(req, res) {
        res.render('Errors/404');
    });*/
};
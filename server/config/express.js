/**
 * Created by Maor on 12/10/2015.
 */
var path = require('path');
var express = require('express');

module.exports = function(app){

    app.use(express.static('client/assets'));
    app.set('views', path.join(__dirname, '../views'));
    app.set('view engine', 'jade');

    /*app.set('views', path.join(__dirname, '../views'));
    app.engine('html', require('jade').renderFile);
    app.set('view engine', 'html');*/
}

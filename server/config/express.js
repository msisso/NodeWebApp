/**
 * Created by Maor on 12/10/2015.
 */
var path = require('path');
var express = require('express');

module.exports = function(app){

    /*app.use(express.static('client'));
    app.set('views', path.join(__dirname, '../views'));
    app.set('view engine', 'jade');*/

    app.use(express.static('client'));

    app.set('views', path.join(__dirname, '../views'));
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');


    console.log(path.join(__dirname, '../../client'));
    console.log(path.join(__dirname, '../../server'));
    app.set('clientPath', path.join(__dirname, '../../client'));
    app.set('serverPath', path.join(__dirname, '../../server'));



}

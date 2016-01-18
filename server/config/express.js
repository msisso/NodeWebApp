/**
 * Created by Maor on 12/10/2015.
 */
var path = require('path');
var express = require('express');
var upload = require('jquery-file-upload-middleware');
var busboy = require("connect-busboy");

var bodyParser = require('body-parser');


module.exports = function(app){

    /*app.use(express.static('client'));
    app.set('views', path.join(__dirname, '../views'));
    app.set('view engine', 'jade');*/
    app.use(busboy());
    app.use(express.static('client'));

    app.set('views', path.join(__dirname, '../views'));
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    console.log(path.join(__dirname, '../../client'));
    console.log(path.join(__dirname, '../../server'));
    app.set('clientPath', path.join(__dirname, '../../client'));
    app.set('serverPath', path.join(__dirname, '../../server'));


    /// Redirect all to home except post
    //app.get('/upload', function( req, res ){
    //    console.log("get upload");
    //
    //    res.redirect('/');
    //});
    //
    //app.put('/upload', function( req, res ){
    //    console.log("put upload");
    //
    //    res.redirect('/');
    //});
    //
    //app.delete('/upload', function( req, res ){
    //    console.log("delete upload");
    //
    //    res.redirect('/');
    //});
    //
    //app.use('/upload', function(req, res, next){
    //    console.log("post upload");
    //    upload.fileHandler({
    //        uploadDir: function () {
    //            return app.get('clientPath') + '/assets/public/uploads'
    //        },
    //        uploadUrl: function () {
    //            return '/upload'
    //        }
    //    })(req, res, next);
    //});

}

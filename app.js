'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/bower_components'));
app.use(express.static(__dirname + '/views'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var researcher = require('./routes/researcher');

app.use('/api/researcher', researcher);

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log('Server listening on http://%s:%s', host, port);
});

module.exports = app;
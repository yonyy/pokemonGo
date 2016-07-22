var express = require('express');
var router = express.Router();
var app = express();
var models = require('../models');
var Pokemon = models.Pokemon;
var Location = models.Location;
var PokeLocation = models.PokeLocation;

router.get('/', function(req, res, next) {
	Pokemon.findAll({})
	.then(function(pokemon) {
		res.json(pokemon);
	});
});

router.post('/', function(req, res, next) {
	Pokemon.create({
		name: req.body.name
	}).then(function(pokemon) {
		res.json(pokemon);
	}).catch(function(err) {
		res.send(err);
	});
});

module.exports = router;
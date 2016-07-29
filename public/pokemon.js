var fs = require('fs');
var jsonfile = require('jsonfile');
var input = 'pokemon.txt';
var output = 'pokemon.json';
var waterfall = require('async-waterfall');

jsonfile.spaces = 4;


/***
File:
[Pokemon Name]
#000 [Pokemon Name]
[Types]

***/
var read = function (callback) {
	fs.readFile(input, 'utf8', function (err, data) {
		var rows = data.split('\n');
		var pokemons = {
			pokemons: []
		};

		for (var i = 0; i < rows.length; i += 3) {
			var name = rows[i];
			var id = parseInt(rows[i+1].split(' ')[0]);
			var types = rows[i+2].split(' ');
			var type_1 = types[0]
			var type_2 = ""
			if (types.length == 2) { type_2 = types[1]; }
			
			var pokemon = {
				id: id,
				name: name,
				type_1 : type_1,
				type_2 : type_2
			}
			pokemons.pokemons.push(pokemon);
		}
		callback(null, pokemons);
	});
};

var write = function(data, callback) {
	jsonfile.writeFile(output, data, function(err) {
		if (err) { callback(err, null) }
		callback(null, 'Successful');
	});
};

waterfall([read, write], function(err, result){
	if (err) {
		console.log(err);
		return;
	}
	console.log(result);
});
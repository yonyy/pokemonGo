var geocoder = require('geocoder');
var jsonfile = require('jsonfile');
var output = 'location.json';
var waterfall = require('async-waterfall');
jsonfile.spaces = 4;

var createData = function(callback) {
  var defaultLocation = {longitude: 32.8548810, latitude: -117.1955280};
  var locations = {
    puppetData: []
  }

  var getRandomPokemonArbitrary = function () {
    return Math.floor(Math.random() * (151 - 1)) + 1;
  }

  var getRandomArbitrary = function(max, min) {
      return Math.floor(Math.random() * (max - min)) + min;
  }

  var i = 0;
  while (i < 200) {
    var longitude = defaultLocation.longitude;
    var latitude = defaultLocation.latitude;
    var address = '';
    var PokemonId = getRandomPokemonArbitrary();
    geocoder.reverseGeocode(longitude, latitude, function ( err, data ) {
        //console.log('long: ' + longitude + ' lat: ' + latitude);
        address = data.results[0].formatted_address;
        locations.puppetData.push({
          longitude: longitude,
          latitude: latitude,
          address: address,
          PokemonId: PokemonId
        });
        console.log(i);
    }, {key: 'AIzaSyB54ZZv-VPUbWTDR1o1vb_alHaX5REYnUo'});
    i++;
  }

  callback(null, locations);
}

var writeData = function(data, callback) {
    //console.log(data);
    jsonfile.writeFile(output, data, function(err) {
      if (err) { callback(err, null) }
      callback(null, 'Successful');
  });
}

waterfall([createData, writeData], function(err, result){
  if (err) {
    console.log(err);
    return;
  }
  console.log(result);
});


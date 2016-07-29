'use strict';
var geocoder = require('geocoder');

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    var defaultLocation = {longitude: 32.8548810, latitude: -117.1955280};
    var puppetData = [];
    var map = {};

    var getRandomPokemonArbitrary = function () {
      return Math.floor(Math.random() * (151 - 1)) + 1;
    }

    var getRandomArbitrary = function(max, min) {
        return Math.random() * (max - min) + min;
    }

    for (var i = 0; i < 200; i++) {
      var longitude = defaultLocation.longitude + getRandomArbitrary(0,50);
      var latitude = defaultLocation.latitude + getRandomArbitrary(0,50);
      var address = '';
      var PokemonId = getRandomPokemonArbitrary();
      
      geocoder.reverseGeocode(longitude, latitude, function ( err, data ) {
        address = data.results[0].formatted_address;
        puppetData.push({
          longitude: longitude,
          latitude: latitude,
          address: data.results[0].formatted_address,
          PokemonId: PokemonId
        });
      }, {key: 'AIzaSyB54ZZv-VPUbWTDR1o1vb_alHaX5REYnUo'});
    }

    return queryInterface.bulkInsert('Locations', puppetData, {});

  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Locations', null, {});
  }
};

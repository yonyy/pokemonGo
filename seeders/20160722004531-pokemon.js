'use strict';
var pokemons = require('../public/pokemon.json');

module.exports = {
  up: function (queryInterface, Sequelize) {

    return queryInterface.bulkInsert('Pokemons', pokemons.pokemons, {});
  },

  down: function (queryInterface, Sequelize) {

    return queryInterface.bulkDelete('Pokemons', null, {});
  }
};

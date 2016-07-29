"use strict";

module.exports = function(sequelize, DataTypes) {
	var Location = sequelize.define("Location", {
		id : {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		longitude: {
			type: DataTypes.FLOAT(11),
			allowNull: false,
			validate: { min: -90, max: 90 }
		},
		latitude: {
			type: DataTypes.FLOAT(11),
			allowNull: false,
			validate: { min: -180, max: 180 }
		},
		address: {
			type: DataTypes.STRING,
			allowNull: false
		},
		PokemonId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'Pokemons',
				key: 'id'
			}
		},
		PokemonCounter: {
			type: DataTypes.INTEGER,
			defaultValue: 1
		},
	});

	return Location;
}
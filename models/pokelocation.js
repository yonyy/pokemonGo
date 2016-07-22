"use strict";

module.exports = function(sequelize, DataTypes) {
	var PokeLocation = sequelize.define("PokeLocation", {
		id : {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		PokemonId : {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'Pokemons',
				key: 'id'
			}
		},
		LocationId : {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'Locations',
				key: 'id'
			}
		}
	},
	{
		classMethods: {
			associate: function(models) {
				PokeLocation.belongsTo(models.Pokemon);
				PokeLocation.belongsTo(models.Location);
			}
		}
	});

	return PokeLocation;
}
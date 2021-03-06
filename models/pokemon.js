"use strict";

module.exports = function(sequelize, DataTypes) {
	var Pokemon = sequelize.define("Pokemon", {
		id : {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true

		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		type_1: {
			type: DataTypes.STRING,
			allowNull: false
		},
		type_2: {
			type: DataTypes.STRING,
			allowNull: false
		}
	});

	return Pokemon;
}
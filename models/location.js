"use strict";

module.exports = function(sequelize, DataTypes) {
	var Location = sequelize.define("Location", {
		id : {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		longitute: {
			type: DataTypes.FLOAT(11),
			allowNull: false,
			validate: { min: -90, max: 90 }
		},
		latitute: {
			type: DataTypes.FLOAT(11),
			allowNull: false,
			validate: { min: -180, max: 180 }
		}
	});

	return Location;
}
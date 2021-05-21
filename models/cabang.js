"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Cabang extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Cabang.hasMany(models.User, { as: "users", foreignKey: "cabangId" });
			Cabang.hasMany(models.Karyawan, { as: "karyawans", foreignKey: "cabangId" });
		}
	}
	Cabang.init(
		{
			namaCabang: DataTypes.STRING,
			status: DataTypes.BOOLEAN,
		},
		{
			defaultScope: {
				order: [["namaCabang", "ASC"]],
				attributes: {
					exclude: ["updatedAt", "deletedAt"],
				},
			},
			sequelize,
			modelName: "Cabang",
			paranoid: true,
		}
	);
	return Cabang;
};

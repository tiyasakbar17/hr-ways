"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Karyawan extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Karyawan.hasOne(models.Cabang, { as: "cabang", foreignKey: "cabangId" });
		}
	}
	Karyawan.init(
		{
			nama: DataTypes.STRING,
			tempatLahir: DataTypes.STRING,
			tanggalLahir: DataTypes.DATE,
			tanggalMasuk: DataTypes.DATE,
			cabangId: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "Karyawan",
			defaultScope: {
				order: [["createdAt", "DESC"]],
			},
			paranoid: true,
		}
	);
	return Karyawan;
};

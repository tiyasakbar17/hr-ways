"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Alamat extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Alamat.belongsTo(models.Karyawan, {as: 'karyawans', foreignKey:'karyawanId'})
		}
	}
	Alamat.init(
		{
			karyawanId: DataTypes.INTEGER,
			provinsi: DataTypes.STRING,
			kabupaten: DataTypes.STRING,
			kecamatan: DataTypes.STRING,
			kelurahan: DataTypes.STRING,
			kodePos: DataTypes.INTEGER,
			detailAlamat: DataTypes.STRING,
		},
		{
			defaultScope: {
				order: [["createdAt", "DESC"]],
			},
			sequelize,
			modelName: "Alamat",
			paranoid: true,
		}
	);
	return Alamat;
};

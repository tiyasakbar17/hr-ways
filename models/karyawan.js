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
			Karyawan.belongsTo(models.Cabang, { as: "cabang", foreignKey: "cabangId" });
			Karyawan.hasOne(models.Alamat, { as: "alamat", foreignKey: "karyawanId" });
			Karyawan.hasOne(models.PersonalData, { as: "personalData", foreignKey: "karyawanId" });
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
			defaultScope: {
				order: [["createdAt", "DESC"]],
				include: [
					{
						model: sequelize.models.Cabang,
						as: "cabang",
					},
					{
						model: sequelize.models.Alamat,
						as: "alamat",
					},
				],
				attributes: {
					exclude: ["updatedAt", "deletedAt", "cabangId"],
				},
			},
			sequelize,
			modelName: "Karyawan",
			paranoid: true,
		}
	);
	return Karyawan;
};

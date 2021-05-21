"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class PersonalData extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			PersonalData.belongsTo(models.Karyawan, { as: "karyawan", foreignKey: "karyawanId" });
		}
	}
	PersonalData.init(
		{
			karyawanId: DataTypes.INTEGER,
			nomorKtp: DataTypes.STRING,
			nomorKk: DataTypes.STRING,
			npwp: DataTypes.STRING,
			bank: DataTypes.STRING,
			nomorRekening: DataTypes.STRING,
			gaji: DataTypes.STRING,
		},
		{
			defaultScope: {
				order: [["createdAt", "DESC"]],
				attributes: {
					exclude: ["updatedAt", "deletedAt", "karyawanId"],
				},
			},
			sequelize,
			modelName: "PersonalData",

			paranoid: true,
		}
	);
	return PersonalData;
};

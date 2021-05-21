"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			User.belongsTo(models.Cabang, { as: "cabang", foreignKey: "cabangId" });
		}
	}
	User.init(
		{
			username: DataTypes.STRING,
			password: DataTypes.STRING,
			role: DataTypes.STRING,
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
				],
				attributes: {
					exclude: ["updatedAt", "deletedAt", 'cabangId'],
				},
			},
			sequelize,
			modelName: "User",

			paranoid: true,
		}
	);
	return User;
};

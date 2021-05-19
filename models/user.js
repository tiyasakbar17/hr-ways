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
			User.hasOne(models.Cabang, { as: "cabang", foreignKey: "cabangId" });
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
			sequelize,
			modelName: "User",
			defaultScope: {
				order: [["createdAt", "DESC"]],
			},
			paranoid: true,
		}
	);
	return User;
};

"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert("Users", [
			{
				username: "tiyasakbar",
				password: "$2b$10$7hbN2PKBlaHUyovbm0fvL.GCG/y0X1Cxg5iuxI.gB9Ke9bI9haeDK",
				role: "admin",
				cabangId: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				username: "tiyasreza",
				password: "$2b$10$7hbN2PKBlaHUyovbm0fvL.GCG/y0X1Cxg5iuxI.gB9Ke9bI9haeDK",
				role: "cabang",
				cabangId: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	down: async (queryInterface, Sequelize) => {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
		await queryInterface.bulkDelete("Users", {
			password: "$2b$10$7hbN2PKBlaHUyovbm0fvL.GCG/y0X1Cxg5iuxI.gB9Ke9bI9haeDK",
		});
	},
};

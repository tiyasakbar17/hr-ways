"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert("Cabangs", [
			{
				namaCabang: 'pusat',
				status: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				namaCabang: 'lampung',
				status: true,
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
	},
};

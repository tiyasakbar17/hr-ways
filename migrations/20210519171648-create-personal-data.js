"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("PersonalData", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			karyawanId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "Karyawans",
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			nomorKtp: {
				type: Sequelize.STRING,
			},
			nomorKk: {
				type: Sequelize.STRING,
			},
			npwp: {
				type: Sequelize.STRING,
			},
			bank: {
				type: Sequelize.STRING,
			},
			nomorRekening: {
				type: Sequelize.STRING,
			},
			gaji: {
				type: Sequelize.STRING,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			deletedAt: {
			  type: Sequelize.DATE
			}
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("PersonalData");
	},
};

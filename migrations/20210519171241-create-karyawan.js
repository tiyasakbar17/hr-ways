"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("Karyawans", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			nama: {
				type: Sequelize.STRING,
			},
			tempatLahir: {
				type: Sequelize.STRING,
			},
			tanggalLahir: {
				type: Sequelize.DATE,
			},
			tanggalMasuk: {
				type: Sequelize.DATE,
			},
			cabangId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "Cabangs",
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
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
		await queryInterface.dropTable("Karyawans");
	},
};

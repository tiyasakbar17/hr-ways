"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("Alamats", {
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
			provinsi: {
				type: Sequelize.STRING,
			},
			kabupaten: {
				type: Sequelize.STRING,
			},
			kecamatan: {
				type: Sequelize.STRING,
			},
			kelurahan: {
				type: Sequelize.STRING,
			},
			kodePos: {
				type: Sequelize.INTEGER,
			},
			detailAlamat: {
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
		await queryInterface.dropTable("Alamats");
	},
};

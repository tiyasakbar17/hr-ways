const { Cabang, sequelize } = require("../../models");
const joi = require("joi");
const { failedResponse, successResponse } = require("../responses");
const { Op } = require("sequelize");

module.exports = {
	addCabang: async (req, res) => {
		try {
			const { namaCabang } = req.body;
			const available = await Cabang.findOne({
				where: {
					namaCabang: namaCabang.toLowerCase(),
				},
			});
			if (available !== null) {
				return failedResponse(res, "Cabang had beed registered");
			}
			const schema = joi.object({
				namaCabang: joi.string().required(),
			});

			const { error } = schema.validate({ namaCabang }, { abortEarly: false });

			if (error) {
				const details = error.details.map((detail) => detail.message.split('"').join("").split("\\").join(""));
				return failedResponse(res, error.details[0].message.split('"').join("").split("\\").join(""), details);
			}
			const newCabang = await Cabang.create({ namaCabang: namaCabang.toLowerCase(), status: true });
			if (!newCabang) {
				return failedResponse(res, "Failed to add cabang, please try again");
			}
			return successResponse(res, newCabang, "New cabang created");
		} catch (error) {
			console.log("Something went wrong at addCabang =====>>>>>", error);
			failedResponse(res, "server error", JSON.stringify(error));
		}
	},

	getAllCabang: async (req, res) => {
		try {
			const { page, keyword, restore } = req.query;
			const conditions = page
				? {
						where: restore
							? keyword
								? {
										namaCabang: sequelize.where(sequelize.fn("LOWER", sequelize.col("namaCabang")), "LIKE", "%" + keyword.toLowerCase() + "%"),
										deletedAt: { [Op.ne]: null },
										id: { [Op.ne]: 1 },
								  }
								: { deletedAt: { [Op.ne]: null }, id: { [Op.ne]: 1 } }
							: keyword
							? {
									namaCabang: sequelize.where(sequelize.fn("LOWER", sequelize.col("namaCabang")), "LIKE", "%" + keyword.toLowerCase() + "%"),
									id: { [Op.ne]: 1 },
							  }
							: { id: { [Op.ne]: 1 } },
						paranoid: restore ? false : true,
						limit: 10,
						offset: (parseInt(page || 1) - 1) * 10,
				  }
				: {
						where: keyword
							? {
									namaCabang: sequelize.where(sequelize.fn("LOWER", sequelize.col("namaCabang")), "LIKE", "%" + keyword.toLowerCase() + "%"),
							  }
							: {},
				  };
			const allCabang = await Cabang.findAndCountAll(conditions);

			if (page) {
				const resultToSend = {
					totalPage: Math.ceil(allCabang.count / 10),
					pageNow: parseInt(page || 1),
					data: allCabang.rows,
				};
				return successResponse(res, resultToSend, "Cabang loaded");
			}
			return successResponse(res, allCabang.rows, "List Cabang");
		} catch (error) {
			console.log("Something went wrong at getAllCabang =====>>>>>", error);
			failedResponse(res, "server error", JSON.stringify(error));
		}
	},

	editCabang: async (req, res) => {
		try {
			const { id, ...restData } = req.body; //** restData : namaCabang, status */
			const available = await Cabang.findOne({
				where: {
					id,
				},
			});
			if (available === null) {
				return failedResponse(res, `Cabang with id ${id} is not found`);
			}
			const schema = joi.object({
				namaCabang: joi.string(),
				status: joi.boolean(),
			});

			const { error } = schema.validate(restData, { abortEarly: false });

			if (error) {
				const details = error.details.map((detail) => detail.message.split('"').join("").split("\\").join(""));
				return failedResponse(res, error.details[0].message.split('"').join("").split("\\").join(""), details);
			}
			await Cabang.update(restData, {
				where: {
					id,
				},
			});
			const newData = await Cabang.findOne({ where: { id } });
			successResponse(res, newData, "Cabang Updated");
		} catch (error) {
			console.log("Something went wrong at editCabang =====>>>>>", error);
			failedResponse(res, "server error", JSON.stringify(error));
		}
	},

	deleteCabang: async (req, res) => {
		try {
			const { id } = req.query;
			const available = await Cabang.findOne({
				where: {
					id,
				},
			});
			if (available === null) {
				return failedResponse(res, `Cabang with id ${id} is not found`);
			}
			await Cabang.destroy({ where: { id } });
			successResponse(res, id, `Cabang with id ${id} is deleted`);
		} catch (error) {
			console.log("Something went wrong at deleteCabang =====>>>>>", error);
			failedResponse(res, "server error", JSON.stringify(error));
		}
	},

	restoreCabang: async (req, res) => {
		try {
			const { id } = req.query;
			await Cabang.restore({ where: { id } });
			const available = await Cabang.findOne({
				where: {
					id,
				},
			});
			if (available === null) {
				return failedResponse(res, `Cabang with id ${id} is not found`);
			}
			successResponse(res, available, `Cabang with id ${id} is restored`);
		} catch (error) {
			console.log("Something went wrong at restoreCabang =====>>>>>", error);
			failedResponse(res, "server error", JSON.stringify(error));
		}
	},
};

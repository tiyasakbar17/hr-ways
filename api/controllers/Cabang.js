const { Cabang, sequelize } = require("../../models");
const jwt = require("jsonwebtoken");
const joi = require("joi");
const { failedResponse, successResponse } = require("../responses");

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
			const newCabang = await Cabang.create({ namaCabang: namaCabang.toLowerCase() });
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
			const { page, keyword } = req.query;
			const allCabang = await Cabang.findAndCountAll({
				where: keyword
					? {
							namaCabang: sequelize.where(sequelize.fn("LOWER", sequelize.col("namaCabang")), "LIKE", "%" + keyword.toLowerCase() + "%"),
					  }
					: {},
				limit: 10,
				offset: (parseInt(page || 1) - 1) * 10,
			});
			const resultToSend = {
				totalPage: Math.ceil(allCabang.count / 10),
				pageNow: parseInt(page || 1),
				data: allCabang.rows,
			};
			successResponse(res, resultToSend, "Cabang loaded");
		} catch (error) {
			console.log("Something went wrong at getAllCabang =====>>>>>", error);
			failedResponse(res, "server error", JSON.stringify(error));
		}
	},
};

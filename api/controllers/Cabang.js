const { Cabang } = require("../../models");
const jwt = require("jsonwebtoken");
const joi = require("joi");
const { failedResponse, successResponse } = require("../responses");

module.exports = {
	addCabang: async (req, res) => {
		try {
			const { namaCabang } = req.body;
			const schema = joi.object({
				namaCabang: joi.string().required(),
			});

			const { error } = schema.validate({ namaCabang }, { abortEarly: false });

			if (error) {
				const details = error.details.map((detail) => detail.message.split('"').join("").split("\\").join(""));
				return failedResponse(res, error.details[0].message.split('"').join("").split("\\").join(""), details);
			}
			const newCabang = Cabang.create({ namaCabang });
			if (!newCabang) {
				return failedResponse(res, 'Failed to add cabang, please try again');
			}
			
		} catch (error) {
			console.log("Something went wrong at addCabang =====>>>>>", error);
			failedResponse(res, "server error", JSON.stringify(error));
		}
	},
};

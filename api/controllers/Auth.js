const { User, Cabang, sequelize } = require("../../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const joi = require("joi");
const { failedResponse, successResponse } = require("../responses");
const { Op } = require("sequelize");

module.exports = {
	addUserCabang: async (req, res) => {
		const { username, password, cabangId } = req.body;
		try {
			const schema = joi.object({
				username: joi.string().min(2).required(),
				password: joi.string().min(6).required(),
				cabangId: joi.number().required(),
			});

			const { error } = schema.validate({ ...req.body }, { abortEarly: false });

			if (error) {
				const details = error.details.map((detail) => detail.message.split('"').join("").split("\\").join(""));
				return failedResponse(res, error.details[0].message.split('"').join("").split("\\").join(""), details);
			} else {
				const checkUsername = await User.findOne({
					where: {
						username,
					},
				});

				if (checkUsername !== null) {
					return failedResponse(res, "Use Another Username");
				}

				const checkCabang = await Cabang.findOne({ where: { id: cabangId } });
				if (checkCabang === null) {
					return failedResponse(res, `Cabang with id ${cabangId} is not found`);
				}

				//**-----------------inserting data------------------ */
				const hashedPassword = await bcrypt.hash(password, 10);
				const newUserData = {
					...req.body,
					password: hashedPassword,
					role: "cabang",
				};
				const newUser = await User.create(newUserData);

				const calledNewUser = await User.findOne({
					where: { id: newUser.id },
					include: {
						model: Cabang,
						as: "cabang",
						attributes: {
							exclude: ["createdAt", "updatedAt", "deletedAt"],
						},
					},
					attributes: {
						exclude: ["createdAt", "updatedAt", "deletedAt", "password"],
					},
				});
				successResponse(res, calledNewUser, "Account Created", 201);
			}
		} catch (error) {
			console.log("something went wrong at addUserCabang======>>>>>>", error);
			failedResponse(res, "server error", JSON.stringify(error));
		}
	},

	getUserCabang: async (req, res) => {
		try {
			const { page, keyword, restore } = req.query;
			const allUser = await User.findAndCountAll({
				where: restore
					? keyword
						? {
								username: sequelize.where(sequelize.fn("LOWER", sequelize.col("username")), "LIKE", "%" + keyword.toLowerCase() + "%"),
								deletedAt: { [Op.ne]: null },
						  }
						: { deletedAt: { [Op.ne]: null } }
					: keyword
					? {
							username: sequelize.where(sequelize.fn("LOWER", sequelize.col("username")), "LIKE", "%" + keyword.toLowerCase() + "%"),
					  }
					: {},
				attributes: {
					exclude: ["password"],
				},
				paranoid: restore ? false : true,
				limit: 10,
				offset: (parseInt(page || 1) - 1) * 10,
			});
			const resultToSend = {
				totalPage: Math.ceil(allUser.count / 10),
				pageNow: parseInt(page || 1),
				data: allUser.rows,
			};
			return successResponse(res, resultToSend, "Users loaded");
		} catch (error) {
			console.log("something went wrong at getUserCabang======>>>>>>", error);
			failedResponse(res, "server error", JSON.stringify(error));
		}
	},

	deleteUserCabang: async (req, res) => {
		try {
			const { id } = req.query;
			const available = await User.findOne({
				where: {
					id,
				},
			});
			if (available === null) {
				return failedResponse(res, `User with id ${id} is not found`);
			}
			await User.destroy({ where: { id } });
			successResponse(res, id, `User with id ${id} is deleted`);
		} catch (error) {
			console.log("Something went wrong at deleteUserCabang =====>>>>>", error);
			failedResponse(res, "server error", JSON.stringify(error));
		}
	},

	restoreUserCabang: async (req, res) => {
		try {
			const { id } = req.query;
			await User.restore({ where: { id } });
			const available = await User.findOne({
				where: {
					id,
				},
				attributes: {
					exclude: ["password"],
				},
			});
			if (available === null) {
				return failedResponse(res, `User with id ${id} is not found`);
			}
			successResponse(res, available, `User with id ${id} is restored`);
		} catch (error) {
			console.log("Something went wrong at restoreUserCabang =====>>>>>", error);
			failedResponse(res, "server error", JSON.stringify(error));
		}
	},

	login: async (req, res) => {
		const { username, password } = req.body;
		try {
			const schema = joi.object({
				username: joi.string().min(5).required(),
				password: joi.string().min(6).required(),
			});

			const { error } = schema.validate({ ...req.body }, { abortEarly: false });

			if (error) {
				const details = error.details.map((detail) => detail.message.split('"').join("").split("\\").join(""));
				return failedResponse(res, error.details[0].message.split('"').join("").split("\\").join(""), details);
			}
			const calledUser = await User.findOne({
				where: {
					username,
				},
			});
			if (calledUser===null) {
				return failedResponse(res, "Check your username");
			}

			const validatingPassword = await bcrypt.compare(password, calledUser.password);

			if (!validatingPassword) {
				return failedResponse(res, "Check your password");
			} else {
				const userId = {
					id: calledUser.id,
					username: calledUser.username,
					role: calledUser.role,
				};
				jwt.sign(
					userId,
					process.env.SECRET_KEY,
					{
						expiresIn: 86400,
					},
					(error, token) => {
						if (error) {
							return failedResponse(res, JSON.stringify(error));
						} else {
							const resultToSend = {
								username,
								role: calledUser.role,
								token,
							};
							return successResponse(res, resultToSend, "Logged In");
						}
					}
				);
			}
		} catch (error) {
			console.log("something went wrong at login======>>>>>>", error);
			failedResponse(res, "server error", JSON.stringify(error));
		}
	},

	loadData: async (req, res) => {
		try {
			const calledUser = await User.findOne({
				where: { id: req.user.id },
				attributes: {
					exclude: ["createdAt", "updatedAt", "password"],
				},
			});
			const resultToSend = {
				username: calledUser.username,
				role: calledUser.role,
			};
			successResponse(res, resultToSend, "account data loaded");
		} catch (error) {
			console.log("something went wrong at loadData======>>>>>>", error);
			failedResponse(res, "server error", JSON.stringify(error));
		}
	},
};

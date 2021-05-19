const { User } = require("../../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const joi = require("joi");
const { failedResponse, successResponse } = require("../responses");

module.exports = {
	addUserCabang: async (req, res) => {
		const { username, password } = req.body;
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

				if (checkUsername) {
					failedResponse(res, "Use Another Username");
				} else {
					const hashedPassword = await bcrypt.hash(password, 10);
					const newUserData = {
						...req.body,
						password: hashedPassword,
						role: 'cabang'
					};
					const newUser = await User.create(newUserData);

					const tokenPayload = {
						id: newUser.id,
						username: newUser.username,
						role: newUser.role,
					};

					const token = await jwt.sign(tokenPayload, process.env.SECRET_KEY, {
						expiresIn: 86400,
					});

					const showResult = {
						username: newUser.username,
						role: newUser.role,
						token,
					};
					return successResponse(res, showResult, "Account Created", 201);
				}
			}
		} catch (error) {
			console.log("something went wrong at addUserCabang======>>>>>>", error);
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
			const validatingPassword = await bcrypt.compare(password, calledUser.password);

			if (!calledUser || !validatingPassword) {
				return failedResponse(res, "Check your username or password");
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

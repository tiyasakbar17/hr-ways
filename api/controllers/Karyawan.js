const { Karyawan, PersonalData, User, Cabang, Alamat, sequelize } = require("../../models");
const joi = require("joi");
const { failedResponse, successResponse } = require("../responses");
const { Op } = require("sequelize");

module.exports = {
	getKaryawanByKtp: async (req, res) => {
		try {
			const { ktp } = req.query,
				calledKaryawan = await Karyawan.findOne({
					include: [
						{
							model: PersonalData,
							where: {
								nomorKtp: ktp,
							},
							as: "personalData",
						},
					],
				});
			if (calledKaryawan === null) {
				return failedResponse(res, `Karyawan with KTP ${ktp} is not found`);
			}
			successResponse(res, calledKaryawan, "Data Loaded");
		} catch (error) {
			console.log("Something went wrong at getKaryawanByKtp =====>>>>>", error);
			failedResponse(res, "server error", JSON.stringify(error));
		}
	},

	addKaryawan: async (req, res) => {
		try {
			const { nomorKtp, nomorKk, npwp, bank, nomorRekening, gaji, nama, tempatLahir, tanggalLahir, tanggalMasuk, ...alamatData } = req.body;
			const available = await PersonalData.findOne({
				where: {
					nomorKtp,
				},
			});
			if (available !== null) {
				return failedResponse(res, "Karyawan had beed registered");
			}
			//**---------------- check if the cabang is active -----------------*/
			const calledUser = await User.findOne({
					where: { id: req.user.id },
				}),
				calledCabang = await Cabang.findOne({
					where: {
						id: calledUser.cabang.id,
					},
				});
			if (calledCabang.status === false) {
				return failedResponse(res, "Cabang is Inactive, Can't add new Employee at the moment");
			}
			const schema = joi.object({
					nama: joi.string().required(),
					tempatLahir: joi.string().required(),
					tanggalLahir: joi.date().required(),
					tanggalMasuk: joi.date().required(),
					nomorKtp: joi.string().required(),
					nomorKk: joi.string().required(),
					npwp: joi.string().required(),
					bank: joi.string().required(),
					nomorRekening: joi.string().required(),
					gaji: joi.string().required(),
					provinsi: joi.string().required(),
					kabupaten: joi.string().required(),
					kecamatan: joi.string().required(),
					kelurahan: joi.string().required(),
					kodePos: joi.number().required(),
					detailAlamat: joi.string().required(),
				}),
				{ error } = schema.validate(req.body, { abortEarly: false });

			if (error) {
				const details = error.details.map((detail) => detail.message.split('"').join("").split("\\").join(""));
				return failedResponse(res, error.details[0].message.split('"').join("").split("\\").join(""), details);
			}

			const newKaryawan = await Karyawan.create({ nama, tempatLahir, tanggalLahir, tanggalMasuk, cabangId: calledCabang.id });
			if (!newKaryawan) {
				return failedResponse(res, "Failed to add cabang, please try again");
			}
			const calledNewKaryawan = await Karyawan.findOne({
					where: { id: newKaryawan.id },
					include: {
						model: Cabang,
						as: "cabang",
						attributes: {
							exclude: ["createdAt", "updatedAt", "deletedAt"],
						},
					},
				}),
				//** instert address */
				newAddress = await Alamat.create({ karyawanId: newKaryawan.id, ...alamatData });

			//**-----------formatting gaji---------------*/
			const stringGaji = gaji.toString(),
				sisaPanjang = stringGaji.length > 3 ? stringGaji.length % 3 : 0,
				//** insert personal data */
				newGaji = (sisaPanjang ? stringGaji.substr(0, sisaPanjang) + "." : "") + stringGaji.substr(sisaPanjang).replace(/(.{3})(?=.)/g, "$1" + "."),
				newPersonalData = await PersonalData.create({ karyawanId: newKaryawan.id, nomorKtp, nomorKk, npwp, bank, nomorRekening, gaji: newGaji });

			return successResponse(res, { ...calledNewKaryawan.dataValues, alamat: newAddress, personalData: newPersonalData }, "New Karyawan created", 201);
		} catch (error) {
			console.log("Something went wrong at addKaryawan =====>>>>>", error);
			failedResponse(res, "server error", JSON.stringify(error));
		}
	},

	getKaryawan: async (req, res) => {
		try {
			const { id, page, keyword, restore } = req.query;
			let cabangId = id ? id : null;
			const calledUser = await User.findOne({
				where: {
					id: req.user.id,
				},
			});
			if (calledUser.role === "cabang") {
				cabangId = calledUser.cabang.id;
			}
			const allKaryawan = await Karyawan.findAndCountAll({
				where: restore
					? keyword
						? {
								nama: sequelize.where(sequelize.fn("LOWER", sequelize.col("nama")), "LIKE", "%" + keyword.toLowerCase() + "%"),
								deletedAt: { [Op.ne]: null },
								cabangId,
						  }
						: { deletedAt: { [Op.ne]: null }, cabangId }
					: keyword
					? {
							nama: sequelize.where(sequelize.fn("LOWER", sequelize.col("nama")), "LIKE", "%" + keyword.toLowerCase() + "%"),
							cabangId,
					  }
					: { cabangId },
				include: [{ model: PersonalData, as: "personalData" }],
				paranoid: restore ? false : true,
				limit: 10,
				offset: (parseInt(page || 1) - 1) * 10,
			});
			const resultToSend = {
				totalPage: Math.ceil(allKaryawan.count / 10),
				pageNow: parseInt(page || 1),
				data: allKaryawan.rows,
			};
			return successResponse(res, resultToSend, "Karyawan loaded");
		} catch (error) {
			console.log("Something went wrong at getKaryaran =====>>>>>", error);
			failedResponse(res, "server error", JSON.stringify(error));
		}
	},

	updateKaryawan: async (req, res) => {
		try {
			const { id, ...dataValidate } = req.body,
				{ nama, tempatLahir, tanggalLahir, tanggalMasuk, ...otherData } = dataValidate,
				{ provinsi, kabupaten, kecamatan, kelurahan, kodePos, detailAlamat, nomorKtp, nomorKk, npwp, bank, nomorRekening, gaji, ...mainData } = dataValidate,
				{ ...personalData } = { provinsi, kabupaten, kecamatan, kelurahan, kodePos, detailAlamat, ...otherData },
				{ ...alamatData } = { nomorKtp, nomorKk, npwp, bank, nomorRekening, gaji, ...otherData };
			const calledKaryawan = await Karyawan.findOne({
				where: {
					id,
				},
			});
			if (calledKaryawan === null) {
				return failedResponse(res, "Karyawan is not registered");
			}
			if (nomorKtp) {
				//**----------------check registered ktp------------------------- */
				const availableKtp = await PersonalData.findOne({
					where: {
						nomorKtp,
						karyawanId: {
							[Op.ne]: id,
						},
					},
				});
				if (availableKtp !== null) {
					return failedResponse(res, "Ktp had been registered");
				}
			}

			//**---------------- check if the cabang is active -----------------*/
			const calledUser = await User.findOne({
				where: { id: req.user.id },
			});

			const calledCabang = await Cabang.findOne({
				where: {
					id: calledUser.cabang.id,
				},
			});
			if (calledCabang.status === false) {
				return failedResponse(res, "Cabang is Inactive, Can't edit Employee Data at the moment");
			}
			const schema = joi.object({
					nama: joi.string(),
					tempatLahir: joi.string(),
					tanggalLahir: joi.date(),
					tanggalMasuk: joi.date(),
					nomorKtp: joi.string(),
					nomorKk: joi.string(),
					npwp: joi.string(),
					bank: joi.string(),
					nomorRekening: joi.string(),
					gaji: joi.string(),
					provinsi: joi.string(),
					kabupaten: joi.string(),
					kecamatan: joi.string(),
					kelurahan: joi.string(),
					kodePos: joi.number(),
					detailAlamat: joi.string(),
				}),
				{ error } = schema.validate(dataValidate, { abortEarly: false });

			if (error) {
				const details = error.details.map((detail) => detail.message.split('"').join("").split("\\").join(""));
				return failedResponse(res, error.details[0].message.split('"').join("").split("\\").join(""), details);
			}
			if (nama || tempatLahir || tanggalLahir || tanggalMasuk) {
				await Karyawan.update(mainData, { where: { id } });
			}
			if (provinsi || kabupaten || kecamatan || kelurahan || kodePos || detailAlamat) {
				await Alamat.update(alamatData, { where: { karyawanId: id } });
			}
			if (nomorKtp || nomorKk || npwp || bank || nomorRekening || gaji || nama || tempatLahir || tanggalLahir || tanggalMasuk) {
				if (isNaN(parseInt(gaji))) {
					//**-----------formatting gaji---------------*/
					const stringGaji = gaji.toString(),
						sisaPanjang = stringGaji.length > 3 ? stringGaji.length % 3 : 0,
						//** insert personal data */
						newGaji = (sisaPanjang ? stringGaji.substr(0, sisaPanjang) + "." : "") + stringGaji.substr(sisaPanjang).replace(/(.{3})(?=.)/g, "$1" + ".");
					await PersonalData.update({ ...personalData, gaji: newGaji }, { where: { karyawanId: id } });
				} else {
					await PersonalData.update(personalData, { where: { karyawanId: id } });
				}
			}

			const calledNewKaryawan = await Karyawan.findOne({
				where: { id },
				include: [{ model: PersonalData, as: "personalData" }],
			});
			successResponse(res, calledNewKaryawan, "Karyawan Updated");
		} catch (error) {
			console.log("Something went wrong at updateKaryawan =====>>>>>", error);
			failedResponse(res, "server error", JSON.stringify(error));
		}
	},

	deleteKaryawan: async (req, res) => {
		try {
			const { id } = req.query;
			const available = await Karyawan.findOne({
				where: {
					id,
				},
			});
			if (available === null) {
				return failedResponse(res, `Karyawan with id ${id} is not found`);
			}
			await Karyawan.destroy({ where: { id } });
			successResponse(res, id, `Karyawan with id ${id} is deleted`);
		} catch (error) {
			console.log("Something went wrong at deleteKaryawan =====>>>>>", error);
			failedResponse(res, "server error", JSON.stringify(error));
		}
	},

	restoreKaryawan: async (req, res) => {
		try {
			const { id } = req.query;
			await Karyawan.restore({ where: { id } });
			const available = await Karyawan.findOne({
				where: {
					id,
				},
			});
			if (available === null) {
				return failedResponse(res, `Karyawan with id ${id} is not found`);
			}
			successResponse(res, available, `Karyawan with id ${id} is restored`);
		} catch (error) {
			console.log("Something went wrong at restoreKaryawan =====>>>>>", error);
			failedResponse(res, "server error", JSON.stringify(error));
		}
	},
};

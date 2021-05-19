const fullData = require("../../models/full.json");
const { failedResponse, successResponse } = require("../responses");

module.exports = {
	addressList: async (req, res) => {
		try {
			const { provinsi, kabupaten, kecamatan } = req.query;
			let results = [];
			let lists = null;

			if (kecamatan) {
				return successResponse(res, fullData[provinsi][kabupaten][kecamatan], "data loaded");
			} else if (kabupaten) {
				lists = fullData[provinsi][kabupaten];
			} else if (provinsi) {
				lists = fullData[provinsi];
			} else {
				lists = fullData;
			}

			for (const data in lists) {
				results.push(data);
			}
			return successResponse(res, results, "data loaded");
		} catch (error) {
			failedResponse(res, "server error", JSON.stringify(error));
		}
	},
};

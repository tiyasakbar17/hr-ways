import Axios from "axios";
import { closeLoading, showLoading, showPopUp } from "./PopUp";

const configJson = {
	headers: {
		"Content-type": "application/json",
	},
};

export const getKaryawan =
	({ id, page, restore, keyword }) =>
	async (dispatch) => {
		try {
			dispatch(showLoading());
			const results = await Axios.get(`/api/v1/karyawan/all?id=${id ? id : ""}page=${page}&keyword=${keyword}&restore=${restore ? restore : ""}`, configJson);
			dispatch({
				type: "GET_KARYAWAN",
				payload: results.data.data,
			});
			dispatch(closeLoading());
			return true;
		} catch (error) {
			dispatch(closeLoading());
			dispatch(showPopUp(error.response.data.message));
			return false;
		}
	};

export const deleteKaryawan = (id, keyword) => async (dispatch, getState) => {
	try {
		const { Karyawan } = getState();
		dispatch(showLoading());
		const results = await Axios.delete(`/api/v1/karyawan/delete?id=${id}`, configJson);
		dispatch(getKaryawan({ page: Karyawan.pageNow, keyword, restore: "" }));
		dispatch(showPopUp(results.data.message));
		dispatch(closeLoading());
	} catch (error) {
		dispatch(closeLoading());
		dispatch(showPopUp(error.response.data.message));
	}
};

export const restoreKaryawan = (id, keyword) => async (dispatch, getState) => {
	try {
		const { Karyawan } = getState();
		dispatch(showLoading());
		const results = await Axios.patch(`/api/v1/karyawan/restore?id=${id}`, configJson);
		dispatch(getKaryawan({ page: Karyawan.pageNow, keyword, restore: true }));
		dispatch(showPopUp(results.data.message));
		dispatch(closeLoading());
	} catch (error) {
		dispatch(closeLoading());
		dispatch(showPopUp(error.response.data.message));
	}
};

export const addKaryawan = (data) => async (dispatch) => {
	try {
		dispatch(showLoading());
		const results = await Axios.post(`/api/v1/karyawan/add`, data, configJson);
		dispatch(getKaryawan({ page: 1, restore: "", keyword: "" }));
		dispatch(showPopUp(results.data.message));
	} catch (error) {
		dispatch(closeLoading());
		dispatch(showPopUp(error.response.data.message));
	}
};

export const editKaryawan = (data) => async (dispatch) => {
	try {
		dispatch(showLoading());
		const results = await Axios.patch(`/api/v1/karyawan/edit`, data, configJson);
		dispatch({
			type: "EDIT_KARYAWAN",
			payload: results.data.data,
		});
		dispatch(showPopUp(results.data.message));
	} catch (error) {
		dispatch(closeLoading());
		dispatch(showPopUp(error.response.data.message));
	}
};

export const getAddress =
	({ provinsi, kabupaten, kecamatan, scope }) =>
	async (dispatch) => {
		try {
			dispatch(showLoading());
			const results = await Axios.get(`/api/v1/full/address?provinsi=${provinsi}&kabupaten=${kabupaten}&kecamatan=${kecamatan}`, configJson);
			dispatch({
				type: "GET_ADDRESS",
				payload: {
					scope,
					data: results.data.data,
				},
			});
			dispatch(closeLoading());
			return true;
		} catch (error) {
			dispatch(closeLoading());
			dispatch(showPopUp(error.response.data.message));
			return false;
		}
	};

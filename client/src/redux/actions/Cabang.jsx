import Axios from "axios";
import { closeLoading, showLoading, showPopUp } from "./PopUp";

const configJson = {
	headers: {
		"Content-type": "application/json",
	},
};

export const getCabang =
	({ page, restore, keyword }) =>
	async (dispatch) => {
		try {
			dispatch(showLoading());
			const results = await Axios.get(`/api/v1/cabang/all?page=${page}&keyword=${keyword}&restore=${restore}`, configJson);
			const { data } = results.data.data;
			if (data === undefined) {
				dispatch({
					type: "GET_ALL_CABANG",
					payload: results.data.data,
				});
			} else {
				dispatch({
					type: "GET_CABANG",
					payload: results.data.data,
				});
			}
			dispatch(closeLoading());
		} catch (error) {
			dispatch(closeLoading());
			dispatch(showPopUp(error.response.data.message));
		}
	};

export const deleteCabang = (id, keyword) => async (dispatch, getState) => {
	try {
		const { Cabang } = getState();
		dispatch(showLoading());
		const results = await Axios.delete(`/api/v1/cabang/delete?id=${id}`, configJson);
		dispatch(getCabang({ page: Cabang.pageNow, keyword, restore: "" }));
		dispatch(showPopUp(results.data.message));
		dispatch(closeLoading());
	} catch (error) {
		dispatch(closeLoading());
		dispatch(showPopUp(error.response.data.message));
	}
};

export const restoreCabang = (id, keyword) => async (dispatch, getState) => {
	try {
		const { Cabang } = getState();
		dispatch(showLoading());
		const results = await Axios.patch(`/api/v1/cabang/restore?id=${id}`, configJson);
		dispatch(getCabang({ page: Cabang.pageNow, keyword, restore: true }));
		dispatch(showPopUp(results.data.message));
		dispatch(closeLoading());
	} catch (error) {
		dispatch(closeLoading());
		dispatch(showPopUp(error.response.data.message));
	}
};

export const addCabang = (data) => async (dispatch) => {
	try {
		dispatch(showLoading());
		const results = await Axios.post(`/api/v1/cabang/add`, data, configJson);
		dispatch(getCabang({ page: 1, restore: "", keyword: "" }));
		dispatch(showPopUp(results.data.message));
	} catch (error) {
		dispatch(closeLoading());
		dispatch(showPopUp(error.response.data.message));
	}
};

export const editCabang = (data) => async (dispatch) => {
	try {
		dispatch(showLoading());
		const results = await Axios.patch(`/api/v1/cabang/edit`, data, configJson);
		dispatch({
			type: "EDIT_CABANG",
			payload: results.data.data,
		});
		dispatch(showPopUp(results.data.message));
	} catch (error) {
		dispatch(closeLoading());
		dispatch(showPopUp(error.response.data.message));
	}
};

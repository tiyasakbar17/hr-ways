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
			const results = await Axios.get(`/cabang/all?page=${page}&keyword=${keyword}&restore=${restore}`, configJson);
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

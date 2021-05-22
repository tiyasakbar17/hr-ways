import Axios from "axios";
import { closeLoading, showLoading, showPopUp } from "./PopUp";
import SetAuthToken from "./setAuthToken";

const configJson = {
	headers: {
		"Content-type": "application/json",
	},
};

export const loadData = () => async (dispatch) => {
	dispatch(showLoading());
	if (localStorage.getItem("token")) {
		SetAuthToken(localStorage.getItem("token"));
	}

	try {
		const result = await Axios.get(`/api/v1/load`, configJson);
		dispatch({
			type: "LOAD_DATA",
			payload: result.data.data,
		});
		dispatch(closeLoading());
	} catch (error) {
		dispatch(closeLoading());
		dispatch({
			type: "AUTH_ERROR",
		});
	}
};
export const userLogin = (data) => async (dispatch) => {
	try {
		dispatch(showLoading());
		const results = await Axios.post(`/api/v1/login`, data, configJson);
		SetAuthToken(results.data.data.token);
		dispatch({
			type: "LOGIN",
			payload: results.data.data,
		});
		dispatch(closeLoading());
	} catch (error) {
		dispatch(closeLoading());
		dispatch(showPopUp(error.response.data.message));
	}
};
export const logout = () => (dispatch) => {
	dispatch({
		type: "LOGOUT",
	});
};

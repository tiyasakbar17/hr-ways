import Axios from "axios";
import { baseUrl } from "./Auth";
import { showLoading, showPopUp, showProgress, closeLoading } from "./PopUp";

const configForm = (dispatch) => ({
	headers: {
		"Content-type": "multipart/form-data",
	},
	onUploadProgress: (ProgressEvent) => {
		let percentage = Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total);
		dispatch(showProgress(percentage));
	},
});
const configJson = {
	headers: {
		"Content-type": "application/json",
	},
};

export const getPosts = () => async (dispatch) => {
	try {
		dispatch(showLoading());
		const results = await Axios.get(`${baseUrl}/posts`);
		dispatch({
			type: "GET_POSTS",
			payload: results.data.posts,
		});
		dispatch(closeLoading());
	} catch (error) {
		dispatch(closeLoading());
		dispatch(showPopUp(error.response.data.message));
	}
};
export const getSavedPosts = () => async (dispatch) => {
	try {
		dispatch(showLoading());
		const results = await Axios.get(`${baseUrl}/bookmarks`);
		dispatch({
			type: "GET_POSTS",
			payload: results.data.posts,
		});
		dispatch(closeLoading());
	} catch (error) {
		dispatch(closeLoading());
		dispatch(showPopUp(error.response.data.message));
	}
};
export const getPost = (id) => async (dispatch) => {
	try {
		dispatch(showLoading());
		dispatch({
			type: "LOADING_POST",
		});
		const result = await Axios.get(`${baseUrl}/post/${id}`);
		dispatch({
			type: "GET_POST",
			payload: result.data.post,
		});
		dispatch(closeLoading());
	} catch (error) {
		dispatch({
			type: "GET_POST",
			payload: null,
		});
		dispatch(closeLoading());
		dispatch(showPopUp("No Post Found"));
	}
};
export const addPost = (data) => async (dispatch) => {
	try {
		const result = await Axios.post(`${baseUrl}/post`, data, configForm(dispatch));
		dispatch(showPopUp(result.data.message));
	} catch (error) {
		dispatch(showPopUp(error.response.data.message));
	}
};
export const deletePost = (data) => async (dispatch) => {
	try {
		dispatch(showLoading());
		const result = await Axios.delete(`${baseUrl}/post/${data}`);
		dispatch(closeLoading());
		dispatch(showPopUp(result.data.message));
		return true;
	} catch (error) {
		dispatch(closeLoading());
		dispatch(showPopUp(error.response.message));
	}
};
export const editPost = (data) => async (dispatch) => {
	try {
		dispatch(showLoading());
		const result = await Axios.patch(`${baseUrl}/post/${data.postId}`, { description: data.description, title: data.title }, configJson);
		dispatch(getPost(data.postId));
		dispatch(closeLoading());
		dispatch(showPopUp(result.data.message));
	} catch (error) {
		dispatch(closeLoading());
		dispatch(showPopUp(error.response.message));
	}
};

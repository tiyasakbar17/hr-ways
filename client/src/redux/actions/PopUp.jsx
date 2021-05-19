export const showPopUp = (message) => (dispatch) => {
    try {
        dispatch({
            type: "POP_UP",
            payload: message,
        });
    } catch (error) {
        console.log(error);
    }
};
export const showLoading = () => (dispatch) => {
    dispatch({
        type: "OPEN_LOADING",
    });
};
export const closeLoading = () => (dispatch) => {
    dispatch({
        type: "CLOSE_LOADING",
    });
};
export const showProgress = (data) => (dispatch) => {
    dispatch({
        type: "OPEN_PROGRESS",
        payload: data,
    });
};

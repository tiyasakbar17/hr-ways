const innitialState = {
	isLogin: false,
	userData: null,
	user: null,
	loading: true
};

const Auth = (state = innitialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case "LOAD_DATA": {
			return {
				...state,
				userData: payload,
				isLogin: true,
				loading: false,
			};
		}

		case "LOGIN":
			const { token, ...restData } = payload;
			localStorage.setItem("token", token);
			return {
				...state,
				userData: restData,
				isLogin: true,
				loading: false
			};

		case "LOGOUT":
			localStorage.removeItem("token");
			return {
				...innitialState,
			};
		case "AUTH_ERROR":
			return {
				...innitialState,
				loading: false
			};
		default:
			return state;
	}
};

export default Auth;

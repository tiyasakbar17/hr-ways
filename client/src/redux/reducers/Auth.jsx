const innitialState = {
	isLogin: false,
	userData: null,
	user: null,
};

const Auth = (state = innitialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case "LOAD_DATA": {
			return {
				...state,
				userData: payload,
				isLogin: true,
			};
		}

		case "LOGIN":
			const { token, ...restData } = payload;
			localStorage.setItem("token", token);
			return {
				...state,
				userData: restData,
				isLogin: true,
			};

		case "LOGOUT":
			localStorage.removeItem("token");
			return {
				...innitialState,
			};
		case "AUTH_ERROR":
			return {
				...innitialState,
			};
		default:
			return state;
	}
};

export default Auth;

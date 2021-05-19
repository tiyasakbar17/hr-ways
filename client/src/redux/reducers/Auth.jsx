const innitialState = {
	isLogin: false,
	userData: null,
	token: null,
	loading: true,
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
				loading: false,
			};
		}

		case "LOGIN":
			localStorage.setItem("token", payload.token);
			return {
				...state,
				token: payload.token,
			};

		case "REGISTER":
			localStorage.setItem("token", payload);
			return {
				...state,
				token: payload,
			};

		case "GET_USER":
			return {
				...state,
				user: payload,
			};

		case "LOGOUT":
			localStorage.removeItem("token");
			return {
				...innitialState,
				loading: false,
			};
		case "AUTH_ERROR":
			return {
				...innitialState,
				loading: false,
			};
		default:
			return state;
	}
};

export default Auth;

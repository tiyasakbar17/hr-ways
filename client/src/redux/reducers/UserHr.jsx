const innitialState = {
	data: [],
	totalPage: null,
	pageNow: null,
};

const UserHr = (state = innitialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case "GET_USER":
			return {
				...state,
				...payload,
			};
		default:
			return state;
	}
};

export default UserHr;

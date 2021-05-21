const innitialState = {
	data: [],
	totalPage: null,
	pageNow: null,
	allData: [],
};

const Cabang = (state = innitialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case "GET_ALL_CABANG":
			return {
				...state,
				allData: payload,
			};
		case "GET_CABANG":
			return {
				...state,
				...payload,
			};
		default:
			return state;
	}
};

export default Cabang;

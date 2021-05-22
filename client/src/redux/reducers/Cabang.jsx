const innitialState = {
	data: [],
	totalPage: null,
	pageNow: null,
	allData: [],
};

const Cabang = (state = innitialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case "EDIT_CABANG":
			const itemIndex = state.data.findIndex((item) => item.id === payload.id);
			const newData2 = [...state.data.slice(0, itemIndex), payload, ...state.data.slice(itemIndex + 1)];
			return {
				...state,
				data: newData2,
			};
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

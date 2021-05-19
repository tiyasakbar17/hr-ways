import axios from "axios";
import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";

function TryPage() {
	const SINGLE_UPLOAD = gql`
		mutation AddOrder($background: Upload) {
			addOrder(order: $background)
		}
	`;
	// const SINGLE_UPLOAD = gql`
	// 	mutation AddOrder($endpoint: String!, $totalPayment: Int!, $template: String!, $user: String!, $background: [Upload]) {
	// 		addOrder(order: { user: $user, template: $template, endpoint: $endpoint, totalPayment: $totalPayment, background: $background })
	// 	}
	// `;
	const initialState = {
		endpoint: "",
		template: "",
		totalPayment: "",
		user: "",
		gallery: [],
	};
	const [state, setstate] = useState(initialState);
	const [mutate, { loading, error }] = useMutation(SINGLE_UPLOAD);
	const changeHandler = (e) => {
		setstate((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};
	const fileHandler = (e) => {
		setstate((prevState) => ({
			...prevState,
			background: e.target.files[0],
		}));
	};
	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			let { totalPayment, endpoint, background, template, user } = state;
			// mutate({ variables: { background } }).then((data) => {
			// 	console.log(data);
			// });
			// mutate({ variables: { totalPayment: parseInt(totalPayment), endpoint, background, template, user } }).then((data) => {
			// 	console.log(data);
			// });
			const formData = new FormData();
			const query = `mutation AddOrder($background: Upload) {
				addOrder(order: $background)
			}`;
			const operations = JSON.stringify({
				query,
				variables: { background: null },
			});
			formData.append("operations", operations);
			const map = {
				0: ["variables.background"],
			};
			formData.append("map", JSON.stringify(map));
			formData.append("0", background);
			const results = await axios.post(`https://us-central1-weddingways-bb7b2.cloudfunctions.net/tryApp/api/v1/graphql`, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			console.log(results.data);
		} catch (error) {
			console.log("dari error sini mang", error.response);
		}
	};
	if (loading) return <div>Loading...</div>;
	if (error) {
		console.log(JSON.stringify(error));
	}
	return (
		<div className="container">
			<form style={{ display: "flex", flexDirection: "column" }}>
				<label>endpoint</label>
				<input type="text" name="endpoint" value={state.endpoint} onChange={changeHandler} />
				<label>template</label>
				<input type="text" name="template" value={state.template} onChange={changeHandler} />
				<label>totalPayment</label>
				<input type="text" name="totalPayment" value={state.totalPayment} onChange={changeHandler} />
				<label>user</label>
				<input type="text" name="user" value={state.user} onChange={changeHandler} />
				<label>gallery</label>
				<input type="file" multiple name="backgorund" onChange={fileHandler} />
				<button onClick={submitHandler}>submit</button>
			</form>
		</div>
	);
}

export default TryPage;

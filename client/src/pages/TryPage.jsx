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
		musik: "",
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
			gallery: e.target.files,
		}));
	};
	const fileHandler2 = (e) => {
		setstate((prevState) => ({
			...prevState,
			musik: e.target.files[0],
		}));
	};
	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			console.log(state.gallery);
			// **---------------------------------------------- */
			const order = {
				endpoint: "tiyasAkbar",
				template: "template1",
				mempelai: {
					mempelaiPria: {
						nama_lengkap: "A",
						nama_panggilan: "A",
						deskripsi: "A",
					},
					mempelaiWanita: {
						nama_lengkap: "B",
						nama_panggilan: "B",
						deskripsi: "B",
					},
				},
				waktuTempat: {
					waktu: new Date("2021-08-17"),
					alamat: "Blambangan Pagar",
				},
				akadResepsi: {
					title: "Akad dan Resepsi",
					deskripsi: "waktu tempat akad resepsi",
					fields: {
						akad: {
							waktuDari: "08.00",
							waktuSampai: "selesai",
							deskripsi: "ini akad time",
							maps: "location here",
						},
						resepsi: {
							waktuDari: "13.00",
							waktuSampai: "selesai",
							deskripsi: "ini resepsi time",
							maps: "location here",
						},
					},
				},
				story: {
					title: "Kisah cinta siapa?",
					deskripsi: "cerita cinta orang",
					fields: [
						{ title: "awalJumpa", waktu: "16 Agustus", deskripsi: "temu Perdana" },
						{ title: "tengah Jumpa", waktu: "17 Agustus", deskripsi: "ajak nikah" },
						{ title: "langsung kawin", waktu: "17 Agustus", deskripsi: "ajak malam kawin" },
					],
				},
				gallery: {
					title: "galery cinta",
					deskripsi: "sayangnya bukan saya",
				},
				video: {
					url: "link yutub",
					judul: "judul video",
					deskripsi: "ini deskripsi singkat",
				},
				quote: {
					pesan: "kata-kata bijak ala2",
					sumber: "-penulis ternama",
				},
				friendWishes: {
					title: "harapan dan doa",
					deskripsi: "kirimin yak",
				},
				totalPayment: 23000,
			};
			const formData = new FormData();
			formData.append("structure", JSON.stringify(order));
			formData.append("fotoPria", state.mempelai.mempelaiPria.foto[0]);
			formData.append("fotoWanita", state.mempelai.mempelaiWanita.foto[0]);
			for (const item in state.background) {
				formData.append("background", state.background[item]);
			}
			for (const item in state.gallery.fields) {
				formData.append("gallery", state.gallery.fields[item]);
			}
			for (const item in state.story.fields) {
				formData.append("story", state.story.fields[item].thumbnail[0]);
			}
			formData.append("musik", state.musik[0]);
			const results = await axios.post(`https://us-central1-weddingways-bb7b2.cloudfunctions.net/app/api/v1/order/add`, formData, {
				headers: {
					"Content-type": "multipart/form-data",
					authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVjenljdzN2aUh6Z2cxaFNSd0FOIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjIwNjY4OTk5LCJleHAiOjE2MjA3NTUzOTl9.MLSrDOobAhGGDG-2BqGmlY_825GcYSuxPj0Caw76iV8",
				},
			});
			// **---------------------------------------------- */
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
				<label>musik</label>
				<input type="file" name="backgorund" onChange={fileHandler2} />
				<button onClick={submitHandler}>submit</button>
			</form>
		</div>
	);
}

export default TryPage;

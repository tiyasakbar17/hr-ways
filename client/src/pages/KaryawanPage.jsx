import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import AddData from "../components/PopUps/AddData";
import Confirmations from "../components/PopUps/Confirmations";
import TableActions from "../components/TableActions";
import { addKaryawan, deleteKaryawan, editKaryawan, getAddress, getKaryawan, restoreKaryawan } from "../redux/actions/Karyawan";

function KaryawanPage() {
	const initialState = {
		restore: false,
		keyword: "",
		confirmation: {
			message: "",
			id: null,
		},
		formData: {
			nama: "",
			tempatLahir: "",
			tanggalMasuk: "",
			tanggalLahir: "",
			nomorKtp: "",
			nomorKk: "",
			npwp: "",
			bank: "",
			nomorRekening: "",
			gaji: "",
			provinsi: "",
			kabupaten: "",
			kecamatan: "",
			kelurahan: "",
			kodePos: "",
			detailAlamat: "",
		},
		scope: "provinsi",
		status: null,
		type: "add",
	};
	const [state, setstate] = useState(initialState);
	const dispatch = useDispatch();
	const { id } = useParams();
	const history = useHistory();
	const Auth = useSelector((state) => state.Auth);
	const Karyawan = useSelector((state) => state.Karyawan);

	const localGetKaryawan = ({ page }) => {
		dispatch(getKaryawan({ id, page, keyword: state.keyword, restore: state.restore ? true : "" }));
	};

	useEffect(() => {
		localGetKaryawan({ page: 1 });
	}, [state.restore, state.keyword]);
	useEffect(() => {
		dispatch(getAddress({ provinsi: state.formData.provinsi, kabupaten: state.formData.kabupaten, kecamatan: state.formData.kecamatan, scope: state.scope }));
	}, [state.scope]);

	const changeHandler = (event) => {
			setstate((prev) => ({ ...prev, [event.target.name]: event.target.value }));
		},
		changeFormHandler = (event) => {
			if (event.target.name === "provinsi") {
				setstate((prev) => ({ ...prev, formData: { ...prev.formData, provinsi: event.target.value, kabupaten: "", kecamatan: "", kelurahan: "", kodePos: "" }, scope: "kabupaten" }));
			} else if (event.target.name === "kabupaten") {
				setstate((prev) => ({ ...prev, formData: { ...prev.formData, kabupaten: event.target.value, kecamatan: "", kelurahan: "", kodePos: "" }, scope: "kecamatan" }));
			} else if (event.target.name === "kecamatan") {
				setstate((prev) => ({ ...prev, formData: { ...prev.formData, kecamatan: event.target.value, kelurahan: "", kodePos: "" }, scope: "kelurahan" }));
			} else if (event.target.name === "kelurahan") {
				const { kelurahan, kode_pos } = Karyawan.alamat.kelurahan.find((item) => item.kelurahan === event.target.value);
				setstate((prev) => ({ ...prev, formData: { ...prev.formData, kelurahan, kodePos: kode_pos } }));
			} else {
				setstate((prev) => ({ ...prev, formData: { ...prev.formData, [event.target.name]: event.target.value } }));
			}
		},
		restoreHandler = (event) => {
			setstate((prev) => ({ ...prev, [event.target.name]: !prev[event.target.name] }));
		},
		confirmationHandler = (name, id) => {
			setstate((prev) => ({ ...prev, confirmation: { message: name, id } }));
		},
		deleteHandler = () => {
			dispatch(deleteKaryawan(state.confirmation.id, state.keyword));
			setstate((prev) => ({ ...prev, confirmation: initialState.confirmation }));
		},
		editHandler = (item, type) => {
			const {
				id,
				nama,
				tempatLahir,
				tanggalLahir,
				tanggalMasuk,
				cabang: { namaCabang },
				alamat: { provinsi, kabupaten, kecamatan, kelurahan, kodePos, detailAlamat },
				personalData: { nomorKtp, nomorKk, npwp, bank, nomorRekening, gaji },
			} = item;
			setstate((prev) => ({
				...prev,
				confirmation: { ...prev.confirmation, id },
				type,
				formData: {
					nama,
					tempatLahir,
					tanggalLahir,
					tanggalMasuk,
					namaCabang,
					provinsi,
					kabupaten,
					kecamatan,
					kelurahan,
					kodePos,
					detailAlamat,
					nomorKtp,
					nomorKk,
					npwp,
					bank,
					nomorRekening,
					gaji,
				},
				scope: "kelurahan",
			}));
			dispatch(getAddress({ provinsi, kabupaten: "", kecamatan: "", scope: "kabupaten" }));
			dispatch(getAddress({ provinsi, kabupaten, kecamatan: "", scope: "kecamatan" }));
		},
		cancelHandler = () => {
			setstate((prev) => ({ ...prev, confirmation: initialState.confirmation, type: "add", formData: initialState.formData }));
		},
		restoreConfirmation = () => {
			dispatch(restoreKaryawan(state.confirmation.id, state.keyword));
			setstate((prev) => ({ ...prev, confirmation: initialState.confirmation }));
		},
		addKaryawanHandle = () => {
			dispatch(addKaryawan(state.formData));
			setstate(initialState);
		},
		editKaryawanHandle = () => {
			const { namaCabang, ...restForm } = state.formData;
			dispatch(editKaryawan({ id: state.confirmation.id, ...restForm }));
			setstate(initialState);
		},
		redirHome = () => {
			history.push("/");
		},
		options = {
			changeHandler,
			restoreHandler,
			cancelHandler,
			show: Auth.userData === "admin" ? false : true,
		};
	return (
		<div className="mt-4 custom-navbar">
			<Confirmations title={`${state.restore ? "Restore" : "Delete"}`} message={`${state.restore ? `Are you sure to restore ${state.confirmation.message}?` : `Are you sure to delete ${state.confirmation.message}?`}`} actions={state.restore ? restoreConfirmation : deleteHandler} />
			<AddData title="employee" type={state.type} actions={state.type === "add" ? (Auth.userData.role === "admin" ? null : addKaryawanHandle) : editKaryawanHandle} cancelAction={cancelHandler}>
				<>
					<div className="form">
						<div className="h5">Cabang's Employees Data</div>
						<label className="mt-1">Name</label>
						<input disabled={state.type === "view" ? true : false} type="text" name="nama" onChange={changeFormHandler} value={state.formData.nama} className="form-control" id="nama" placeholder="Name" />
						<label className="mt-1">Birth Place</label>
						<input disabled={state.type === "view"} type="text" name="tempatLahir" onChange={changeFormHandler} value={state.formData.tempatLahir} className="form-control" id="tempatLahir" placeholder="Birth Place" />
						<label className="mt-1">Birth Date</label>
						<input disabled={state.type === "view"} type="date" name="tanggalLahir" onChange={changeFormHandler} value={state.formData.tanggalLahir.substr(0, 10)} className="form-control" id="tanggalLahir" />
						<label className="mt-1">Start Working</label>
						<input disabled={state.type === "view"} type="date" name="tanggalMasuk" onChange={changeFormHandler} value={state.formData.tanggalMasuk.substr(0, 10)} className="form-control" id="tanggalMasuk" placeholder="Start Working" />
						<label className="mt-1">KTP</label>
						<input disabled={state.type === "view"} type="text" name="nomorKtp" onChange={changeFormHandler} value={state.formData.nomorKtp} className="form-control" id="nomorKtp" placeholder="KTP" />
						<label className="mt-1">KK</label>
						<input disabled={state.type === "view"} type="text" name="nomorKk" onChange={changeFormHandler} value={state.formData.nomorKk} className="form-control" id="nomorKk" placeholder="KK" />
						<label className="mt-1">NPWP</label>
						<input disabled={state.type === "view"} type="text" name="npwp" onChange={changeFormHandler} value={state.formData.npwp} className="form-control" id="npwp" placeholder="NPWP" />
						<label className="mt-1">Bank</label>
						<input disabled={state.type === "view"} type="text" name="bank" onChange={changeFormHandler} value={state.formData.bank} className="form-control" id="bank" placeholder="Bank Name" />
						<label className="mt-1">Bank Account</label>
						<input disabled={state.type === "view"} type="text" name="nomorRekening" onChange={changeFormHandler} value={state.formData.nomorRekening} className="form-control" id="nomorRekening" placeholder="Bank Account" />
						<label className="mt-1">Salary</label>
						<input disabled={state.type === "view"} type="text" name="gaji" onChange={changeFormHandler} value={state.formData.gaji} className="form-control" id="gaji" placeholder="Salary" />
						<label className="mt-1">Province</label>
						<select disabled={state.type === "view"} name="provinsi" onChange={changeFormHandler} value={state.formData.provinsi} className="form-control">
							<option>Select</option>
							{Karyawan.alamat.provinsi.map((item, index) => {
								return (
									<option key={index} value={item}>
										{item}
									</option>
								);
							})}
						</select>
						<label className="mt-1">Regency</label>
						<select disabled={state.type === "view"} name="kabupaten" onChange={changeFormHandler} value={state.formData.kabupaten} className="form-control">
							<option>Select</option>
							{Karyawan.alamat.kabupaten.map((item, index) => {
								return (
									<option key={index} value={item}>
										{item}
									</option>
								);
							})}
						</select>
						<label className="mt-1">District</label>
						<select disabled={state.type === "view"} name="kecamatan" onChange={changeFormHandler} value={state.formData.kecamatan} className="form-control">
							<option>Select</option>
							{Karyawan.alamat.kecamatan.map((item, index) => {
								return (
									<option key={index} value={item}>
										{item}
									</option>
								);
							})}
						</select>
						<label className="mt-1">Sub-District</label>
						<select disabled={state.type === "view"} name="kelurahan" onChange={changeFormHandler} value={state.formData.kelurahan} className="form-control">
							<option>Select</option>
							{Karyawan.alamat.kelurahan.map((item, index) => {
								return (
									<option key={index} value={item.kelurahan}>
										{item.kelurahan}
									</option>
								);
							})}
						</select>
						<label className="mt-1">Postal Code</label>
						<input type="text" name="kodePos" disabled onChange={changeFormHandler} value={state.formData.kodePos} className="form-control" id="kodePos" placeholder="Postal Code" />
						<label className="mt-1">Address Detail</label>
						<input disabled={state.type === "view"} type="text" name="detailAlamat" onChange={changeFormHandler} value={state.formData.detailAlamat} className="form-control" id="detailAlamat" placeholder="Address Detail" />
					</div>
				</>
			</AddData>
			{Auth.userData.role === "admin" ? (
				<div className="btn bg-third pointer" onClick={redirHome}>
					Back
				</div>
			) : null}
			<h1>{state.restore ? "Deleted Employees" : "All Employees"}</h1>
			<TableActions {...options} />
			<table className="table table-striped mt-1 custom-table2">
				<thead className="bg-second">
					<tr>
						<th scope="col">#</th>
						<th scope="col">Name</th>
						<th scope="col">Cabang</th>
						<th scope="col">Gaji</th>
						<th scope="col">Action</th>
					</tr>
				</thead>
				<tbody>
					{Karyawan.data.map((item, index) => {
						return (
							<tr key={item.id}>
								<th scope="row">{(Karyawan.pageNow - 1) * 10 + (index + 1)}</th>
								<td className="text-capitalize">{item.nama}</td>
								<td className="text-capitalize">{item.cabang.namaCabang}</td>
								<td>Rp. {item.personalData.gaji}</td>
								<td className="d-flex flex-row">
									{state.restore ? (
										<div className="pointer" data-toggle="modal" data-target="#modalLabel" onClick={() => confirmationHandler(item.nama, item.id)}>
											<i className="fas fa-recycle"></i>
										</div>
									) : (
										<>
											<div className="pointer" data-toggle="modal" data-target="#addDataLabel" onClick={() => editHandler(item, "view")}>
												<i className="fas fa-eye"></i>
											</div>
											<div className="pointer ml-2" data-toggle="modal" data-target="#addDataLabel" onClick={() => editHandler(item, "edit")}>
												<i className="fas fa-pencil-alt"></i>
											</div>
											<div className="pointer ml-2" data-toggle="modal" data-target="#modalLabel" onClick={() => confirmationHandler(item.nama, item.id)}>
												<i className="fas fa-trash-alt"></i>
											</div>
										</>
									)}
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			<nav aria-label="Page navigation example">
				<ul className="pagination">
					<li className="page-item">
						<span className={`page-link ${Karyawan.totalPage !== 0 && Karyawan.pageNow !== 1 ? "pointer" : "bg-secondary text-white"}`} onClick={Karyawan.pageNow !== Karyawan.totalPage && Karyawan.totalPage !== 0 ? () => localGetKaryawan({ page: 1 }) : null} aria-label="Previous">
							<span aria-hidden="true">&laquo;</span>
							<span className="sr-only">Previous</span>
						</span>
					</li>
					<li className="page-item">
						<span className={`page-link ${Karyawan.pageNow > 1 ? "pointer" : "bg-secondary text-white"}`} onClick={Karyawan.pageNow > 1 ? (Karyawan.pageNow === Karyawan.totalPage ? () => localGetKaryawan({ page: Karyawan.pageNow - 1 }) : () => localGetKaryawan({ page: Karyawan.pageNow - 2 })) : null}>
							{Karyawan.pageNow > 1 ? (Karyawan.pageNow === Karyawan.totalPage ? Karyawan.pageNow - 1 : Karyawan.pageNow - 2) : 1}
						</span>
					</li>
					{Karyawan.totalPage === 1 || Karyawan.totalPage === 0 ? null : Karyawan.totalPage === 2 ? (
						<li className="page-item">
							<span className={`page-link ${Karyawan.pageNow === Karyawan.totalPage ? "bg-secondary text-white" : "pointer"}`} onClick={Karyawan.pageNow === Karyawan.totalPage ? null : () => localGetKaryawan({ page: Karyawan.pageNow + 1 })}>
								{Karyawan.pageNow === Karyawan.totalPage ? Karyawan.pageNow : Karyawan.pageNow + 1}
							</span>
						</li>
					) : (
						<>
							<li className="page-item">
								<span className={`page-link ${Karyawan.pageNow === Karyawan.totalPage ? "pointer" : "bg-secondary text-white"}`} onClick={Karyawan.pageNow === Karyawan.totalPage ? () => localGetKaryawan({ page: Karyawan.pageNow - 1 }) : null}>
									{Karyawan.pageNow === Karyawan.totalPage ? Karyawan.pageNow - 1 : Karyawan.pageNow}
								</span>
							</li>
							<li className="page-item">
								<span className={`page-link ${Karyawan.pageNow === Karyawan.totalPage ? "bg-secondary text-white" : "pointer"}`} onClick={Karyawan.pageNow === Karyawan.totalPage ? null : () => localGetKaryawan({ page: Karyawan.pageNow + 1 })}>
									{Karyawan.pageNow === Karyawan.totalPage ? Karyawan.pageNow : Karyawan.pageNow + 1}
								</span>
							</li>
						</>
					)}

					<li className="page-item">
						<span className={`page-link ${Karyawan.pageNow !== Karyawan.totalPage && Karyawan.totalPage !== 0 ? "pointer" : "bg-secondary text-white"}`} onClick={Karyawan.pageNow !== Karyawan.totalPage && Karyawan.totalPage !== 0 ? () => localGetKaryawan({ page: Karyawan.totalPage }) : null} aria-label="Next">
							<span aria-hidden="true">&raquo;</span>
							<span className="sr-only">Next</span>
						</span>
					</li>
				</ul>
			</nav>
		</div>
	);
}

export default KaryawanPage;

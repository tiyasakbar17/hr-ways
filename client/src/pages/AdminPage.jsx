import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import AddData from "../components/PopUps/AddData";
import Confirmations from "../components/PopUps/Confirmations";
import TableActions from "../components/TableActions";
import { addCabang, deleteCabang, editCabang, getCabang, restoreCabang } from "../redux/actions/Cabang";

function AdminPage() {
	const initialState = {
		restore: false,
		keyword: "",
		confirmation: {
			message: "",
			id: null,
		},
		namaCabang: "",
		status: null,
		type: "add",
	};
	const [state, setstate] = useState(initialState);
	const dispatch = useDispatch();
	const history = useHistory();
	const Cabang = useSelector((state) => state.Cabang);

	const localGetCabang = ({ page }) => {
		dispatch(getCabang({ page, keyword: state.keyword, restore: state.restore ? true : "" }));
	};

	useEffect(() => {
		localGetCabang({ page: 1 });
	}, [state.restore, state.keyword]);

	const changeHandler = (event) => {
			setstate((prev) => ({ ...prev, [event.target.name]: event.target.value }));
		},
		restoreHandler = (event) => {
			setstate((prev) => ({ ...prev, [event.target.name]: !prev[event.target.name] }));
		},
		confirmationHandler = (name, id) => {
			setstate((prev) => ({ ...prev, confirmation: { message: name, id } }));
		},
		deleteHandler = () => {
			dispatch(deleteCabang(state.confirmation.id, state.keyword));
			setstate((prev) => ({ ...prev, confirmation: initialState.confirmation }));
		},
		editHandler = (id, nama, status) => {
			setstate((prev) => ({ ...prev, confirmation: { ...prev.confirmation, id }, type: "edit", namaCabang: nama, status }));
		},
		cancelHandler = () => {
			setstate((prev) => ({ ...prev, confirmation: initialState.confirmation, type: "add", namaCabang: "" }));
		},
		restoreConfirmation = () => {
			dispatch(restoreCabang(state.confirmation.id, state.keyword));
			setstate((prev) => ({ ...prev, confirmation: initialState.confirmation }));
		},
		addCabangHandle = (e) => {
			e.preventDefault();
			dispatch(addCabang({ namaCabang: state.namaCabang }));
			setstate(initialState);
		},
		editCabangHandle = (e) => {
			e.preventDefault();
			dispatch(editCabang({ id: state.confirmation.id, namaCabang: state.namaCabang, status: state.status }));
			setstate(initialState);
		},
		detailCabang = (id) => {
			history.push(`/admin/karyawan/${id}`);
		},
		options = {
			changeHandler,
			restoreHandler,
			cancelHandler,
			show: true,
		};

	return (
		<div className="mt-4 custom-navbar">
			<Confirmations title={`${state.restore ? "Restore" : "Delete"}`} message={`${state.restore ? `Are you sure to restore ${state.confirmation.message}?` : `Are you sure to delete ${state.confirmation.message}?`}`} actions={state.restore ? restoreConfirmation : deleteHandler} />
			<AddData title="cabang" type={state.type} actions={state.type === "add" ? addCabangHandle : editCabangHandle} cancelAction={cancelHandler}>
				<div className="form-group">
					<label className="h6" htmlFor="namaCabang">
						Cabang's Name
					</label>
					<input type="text" name="namaCabang" onChange={changeHandler} value={state.namaCabang} className="form-control" id="namaCabang" placeholder="Name" required/>
					{state.type === "edit" ? (
						<div className="actions mt-2 d-flex flex-column">
							<h6>Status</h6>
							<div className="d-flex align-items-start">
								<div className="form-switch">
									<label className="switch">
										<input type="checkbox" name="status" checked={state.status} onChange={restoreHandler} />
										<span className="slider round"></span>
									</label>
									<span className="h5 ml-2">{state.status ? "active" : "inactive"}</span>
								</div>
							</div>
						</div>
					) : null}
				</div>
			</AddData>
			<h1>{state.restore ? "Deleted Cabang" : "All Cabang"}</h1>
			<TableActions {...options} />
			<table className="table table-striped mt-1  custom-table">
				<thead className="bg-second">
					<tr>
						<th scope="col">#</th>
						<th scope="col">Cabang Name</th>
						<th scope="col">Status</th>
						<th scope="col">Action</th>
					</tr>
				</thead>
				<tbody>
					{Cabang.data.map((item, index) => {
						return (
							<tr key={item.id}>
								<th scope="row">{(Cabang.pageNow - 1) * 10 + (index + 1)}</th>
								<td className="text-capitalize">{item.namaCabang}</td>
								<td>{item.status ? "active" : "inactive"}</td>
								<td className="d-flex flex-row">
									{state.restore ? (
										<div className="pointer" data-toggle="modal" data-target="#modalLabel" onClick={() => confirmationHandler(item.namaCabang, item.id)}>
											<i className="fas fa-recycle"></i>
										</div>
									) : (
										<>
											<div className="pointer" onClick={() => detailCabang(item.id)}>
												<i className="fas fa-eye" color="black"></i>
											</div>
											<div className="pointer ml-2" data-toggle="modal" data-target="#addDataLabel" onClick={() => editHandler(item.id, item.namaCabang, item.status)}>
												<i className="fas fa-pencil-alt"></i>
											</div>
											<div className="pointer ml-2" data-toggle="modal" data-target="#modalLabel" onClick={() => confirmationHandler(item.namaCabang, item.id)}>
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
						<span className={`page-link ${Cabang.totalPage !== 0 && Cabang.pageNow !== 1 ? "pointer" : "bg-secondary text-white"}`} onClick={Cabang.pageNow !== Cabang.totalPage && Cabang.totalPage !== 0 ? () => localGetCabang({ page: 1 }) : null} aria-label="Previous">
							<span aria-hidden="true">&laquo;</span>
							<span className="sr-only">Previous</span>
						</span>
					</li>
					<li className="page-item">
						<span className={`page-link ${Cabang.pageNow > 1 ? "pointer" : "bg-secondary text-white"}`} onClick={Cabang.pageNow > 1 ? (Cabang.pageNow === Cabang.totalPage ? () => localGetCabang({ page: Cabang.pageNow - 1 }) : () => localGetCabang({ page: Cabang.pageNow - 2 })) : null}>
							{Cabang.pageNow > 1 ? (Cabang.pageNow === Cabang.totalPage ? Cabang.pageNow - 1 : Cabang.pageNow - 2) : 1}
						</span>
					</li>
					{Cabang.totalPage === 1 || Cabang.totalPage === 0 ? null : Cabang.totalPage === 2 ? (
						<li className="page-item">
							<span className={`page-link ${Cabang.pageNow === Cabang.totalPage ? "bg-secondary text-white" : "pointer"}`} onClick={Cabang.pageNow === Cabang.totalPage ? null : () => localGetCabang({ page: Cabang.pageNow + 1 })}>
								{Cabang.pageNow === Cabang.totalPage ? Cabang.pageNow : Cabang.pageNow + 1}
							</span>
						</li>
					) : (
						<>
							<li className="page-item">
								<span className={`page-link ${Cabang.pageNow === Cabang.totalPage ? "pointer" : "bg-secondary text-white"}`} onClick={Cabang.pageNow === Cabang.totalPage ? () => localGetCabang({ page: Cabang.pageNow - 1 }) : null}>
									{Cabang.pageNow === Cabang.totalPage ? Cabang.pageNow - 1 : Cabang.pageNow}
								</span>
							</li>
							<li className="page-item">
								<span className={`page-link ${Cabang.pageNow === Cabang.totalPage ? "bg-secondary text-white" : "pointer"}`} onClick={Cabang.pageNow === Cabang.totalPage ? null : () => localGetCabang({ page: Cabang.pageNow + 1 })}>
									{Cabang.pageNow === Cabang.totalPage ? Cabang.pageNow : Cabang.pageNow + 1}
								</span>
							</li>
						</>
					)}

					<li className="page-item">
						<span className={`page-link ${Cabang.pageNow !== Cabang.totalPage && Cabang.totalPage !== 0 ? "pointer" : "bg-secondary text-white"}`} onClick={Cabang.pageNow !== Cabang.totalPage && Cabang.totalPage !== 0 ? () => localGetCabang({ page: Cabang.totalPage }) : null} aria-label="Next">
							<span aria-hidden="true">&raquo;</span>
							<span className="sr-only">Next</span>
						</span>
					</li>
				</ul>
			</nav>
		</div>
	);
}

export default AdminPage;

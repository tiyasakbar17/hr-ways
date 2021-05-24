import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddData from "../components/PopUps/AddData";
import Confirmations from "../components/PopUps/Confirmations";
import TableActions from "../components/TableActions";
import { getCabang } from "../redux/actions/Cabang";
import { addUser, deleteUser, getUser, restoreUser } from "../redux/actions/User";

function UserPage() {
	const initialState = {
		restore: false,
		keyword: "",
		confirmation: {
			message: "",
			id: null,
		},
		username: "",
		password: "",
		cabangId: "",
		status: null,
		type: "add",
	};
	const [state, setstate] = useState(initialState);
	const dispatch = useDispatch();
	const UserHr = useSelector((state) => state.UserHr);
	const { allData } = useSelector((state) => state.Cabang);

	const localGetUserHr = ({ page }) => {
		dispatch(getUser({ page, keyword: state.keyword, restore: state.restore ? true : "" }));
	};

	useEffect(() => {
		localGetUserHr({ page: 1 });
	}, [state.restore, state.keyword]);
	useEffect(() => {
		dispatch(getCabang({ page: "", keyword: "", restore: "" }));
	}, []);
    
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
			dispatch(deleteUser(state.confirmation.id, state.keyword));
			setstate((prev) => ({ ...prev, confirmation: initialState.confirmation }));
		},
		cancelHandler = () => {
			setstate((prev) => ({ ...prev, confirmation: initialState.confirmation, type: "add", username: "", password: "" }));
		},
		restoreConfirmation = () => {
			dispatch(restoreUser(state.confirmation.id, state.keyword));
			setstate((prev) => ({ ...prev, confirmation: initialState.confirmation }));
		},
		addUserHrHandler = (e) => {
			e.preventDefault();
			dispatch(addUser({ username: state.username, password: state.password, cabangId: state.cabangId }));
			setstate(initialState);
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
			<AddData title="cabang" type={state.type} actions={addUserHrHandler} cancelAction={cancelHandler}>
				<div className="form-group">
					<label className="h6">Cabang</label>
					<select name="cabangId" onChange={changeHandler} value={state.cabangId} className="form-control text-capitalize" required>
						<option>Select</option>
						{allData.map((item) => {
							return (
								<option key={item.id} value={item.id} className="text-capitalize">
									{item.namaCabang}
								</option>
							);
						})}
					</select>
				</div>
				<div className="form-group">
					<label className="h6">Username</label>
					<input type="text" name="username" onChange={changeHandler} value={state.username} className="form-control" placeholder="username" />
				</div>
				<div className="form-group">
					<label className="h6">Password</label>
					<input type="password" name="password" onChange={changeHandler} value={state.password} className="form-control" placeholder="Password" />
				</div>
			</AddData>
			<h1>{state.restore ? "Deleted User HR" : "All User HR"}</h1>
			<TableActions {...options} />
			<table className="table table-striped mt-1  custom-table">
				<thead className="bg-second">
					<tr>
						<th scope="col">#</th>
						<th scope="col">username</th>
						<th scope="col">Cabang</th>
						<th scope="col">Action</th>
					</tr>
				</thead>
				<tbody>
					{UserHr.data.map((item, index) => {
						return (
							<tr key={item.id}>
								<th scope="row">{(UserHr.pageNow - 1) * 10 + (index + 1)}</th>
								<td>{item.username}</td>
								<td className="text-capitalize">{item.cabang.namaCabang}</td>
								<td className="d-flex flex-row">
									{state.restore ? (
										<div className="pointer" data-toggle="modal" data-target="#modalLabel" onClick={() => confirmationHandler(item.username, item.id)}>
											<i className="fas fa-recycle"></i>
										</div>
									) : (
										<div className="pointer ml-2" data-toggle="modal" data-target="#modalLabel" onClick={() => confirmationHandler(item.username, item.id)}>
											<i className="fas fa-trash-alt"></i>
										</div>
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
						<span className={`page-link ${UserHr.totalPage !== 0 && UserHr.pageNow !== 1 ? "pointer" : "bg-secondary text-white"}`} onClick={UserHr.pageNow !== UserHr.totalPage && UserHr.totalPage !== 0 ? () => localGetUserHr({ page: 1 }) : null} aria-label="Previous">
							<span aria-hidden="true">&laquo;</span>
							<span className="sr-only">Previous</span>
						</span>
					</li>
					<li className="page-item">
						<span className={`page-link ${UserHr.pageNow > 1 ? "pointer" : "bg-secondary text-white"}`} onClick={UserHr.pageNow > 1 ? (UserHr.pageNow === UserHr.totalPage ? () => localGetUserHr({ page: UserHr.pageNow - 1 }) : () => localGetUserHr({ page: UserHr.pageNow - 2 })) : null}>
							{UserHr.pageNow > 1 ? (UserHr.pageNow === UserHr.totalPage ? UserHr.pageNow - 1 : UserHr.pageNow - 2) : 1}
						</span>
					</li>
					{UserHr.totalPage === 1 || UserHr.totalPage === 0 ? null : UserHr.totalPage === 2 ? (
						<li className="page-item">
							<span className={`page-link ${UserHr.pageNow === UserHr.totalPage ? "bg-secondary text-white" : "pointer"}`} onClick={UserHr.pageNow === UserHr.totalPage ? null : () => localGetUserHr({ page: UserHr.pageNow + 1 })}>
								{UserHr.pageNow === UserHr.totalPage ? UserHr.pageNow : UserHr.pageNow + 1}
							</span>
						</li>
					) : (
						<>
							<li className="page-item">
								<span className={`page-link ${UserHr.pageNow === UserHr.totalPage ? "pointer" : "bg-secondary text-white"}`} onClick={UserHr.pageNow === UserHr.totalPage ? () => localGetUserHr({ page: UserHr.pageNow - 1 }) : null}>
									{UserHr.pageNow === UserHr.totalPage ? UserHr.pageNow - 1 : UserHr.pageNow}
								</span>
							</li>
							<li className="page-item">
								<span className={`page-link ${UserHr.pageNow === UserHr.totalPage ? "bg-secondary text-white" : "pointer"}`} onClick={UserHr.pageNow === UserHr.totalPage ? null : () => localGetUserHr({ page: UserHr.pageNow + 1 })}>
									{UserHr.pageNow === UserHr.totalPage ? UserHr.pageNow : UserHr.pageNow + 1}
								</span>
							</li>
						</>
					)}

					<li className="page-item">
						<span className={`page-link ${UserHr.pageNow !== UserHr.totalPage && UserHr.totalPage !== 0 ? "pointer" : "bg-secondary text-white"}`} onClick={UserHr.pageNow !== UserHr.totalPage && UserHr.totalPage !== 0 ? () => localGetUserHr({ page: UserHr.totalPage }) : null} aria-label="Next">
							<span aria-hidden="true">&raquo;</span>
							<span className="sr-only">Next</span>
						</span>
					</li>
				</ul>
			</nav>
		</div>
	);
}

export default UserPage;

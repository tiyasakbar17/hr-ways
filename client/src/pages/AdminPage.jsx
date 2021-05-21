import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCabang } from "../redux/actions/Cabang";

function AdminPage() {
	const initialState = {
		restore: false,
		keyword: "",
	};
	const [state, setstate] = useState(initialState);
	const dispatch = useDispatch();
	const Cabang = useSelector((state) => state.Cabang);

	const localGetCabang = ({ page }) => {
		dispatch(getCabang({ page, keyword: state.keyword, restore: state.restore ? true : "" }));
	};

	useEffect(() => {
		localGetCabang({ page: 1 });
	}, [state.keyword]);

	const changeHandler = (event) => {
		setstate((prev) => ({ ...prev, [event.target.name]: event.target.value }));
	};

	return (
		<div className="mt-4 custom-navbar">
			<h1>ADMIN PAGE</h1>
			<form className="form-inline my-2 my-lg-0">
				<input className="form-control mr-sm-2" type="text" name="keyword" onChange={changeHandler} placeholder="Search" />
			</form>
			<table className="table table-striped mt-1">
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
								<td>{item.namaCabang}</td>
								<td>{item.status ? "active" : "inactive"}</td>
								<td>@mdo</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			<nav aria-label="Page navigation example">
				<ul className="pagination">
					<li className="page-item">
						<span className={`page-link ${Cabang.pageNow !== Cabang.totalPage ? "pointer" : "bg-secondary text-white"}`} onClick={Cabang.pageNow !== Cabang.totalPage ? ()=>localGetCabang({ page: 1 }) : null} aria-label="Previous">
							<span aria-hidden="true">&laquo;</span>
							<span className="sr-only">Previous</span>
						</span>
					</li>
					<li className="page-item">
						<span className={`page-link ${Cabang.pageNow > 1 ? "pointer" : "bg-secondary text-white"}`}>{Cabang.pageNow > 1 ? (Cabang.pageNow === Cabang.totalPage ? Cabang.pageNow - 2 : Cabang.pageNow - 1) : 1}</span>
					</li>
					{Cabang.totalPage === 1 || Cabang.totalPage === 0 ? null : Cabang.totalPage === 2 ? (
						<li className="page-item">
							<span className={`page-link ${Cabang.pageNow === Cabang.totalPage ? "bg-secondary text-white" : "pointer"}`}>{Cabang.pageNow === Cabang.totalPage ? Cabang.pageNow : Cabang.pageNow + 1}</span>
						</li>
					) : (
						<>
							<li className="page-item">
								<span className={`page-link ${Cabang.pageNow === Cabang.totalPage ? "pointer" : "bg-secondary text-white"}`}>{Cabang.pageNow === Cabang.totalPage ? Cabang.pageNow - 1 : Cabang.pageNow}</span>
							</li>
							<li className="page-item">
								<span className={`page-link ${Cabang.pageNow === Cabang.totalPage ? "bg-secondary text-white" : "pointer"}`}>{Cabang.pageNow === Cabang.totalPage ? Cabang.pageNow : Cabang.pageNow + 1}</span>
							</li>
						</>
					)}

					<li className="page-item">
						<span className={`page-link ${Cabang.pageNow !== Cabang.totalPage ? "pointer" : "bg-secondary text-white"}`} onClick={Cabang.pageNow !== Cabang.totalPage ? () => localGetCabang({ page: Cabang.totalPage }) : null} aria-label="Next">
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

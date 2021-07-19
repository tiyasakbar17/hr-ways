import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/actions/Auth";
import Login from "./Auth/Login";
import Loading from "./PopUps/Loading";
import PopUps from "./PopUps/PopUps";

const Navbar = ({ Auth: { isLogin, userData }, PopUpState: { isPoped, loadingComp }, logout }) => {
	const innitialValue = {
		login: false,
	};

	const [state, setState] = useState(innitialValue);

	const showLogin = () => {
		setState((prevState) => ({ ...prevState, login: !prevState.login }));
	};
	return isLogin ? (
		<>
			{isPoped ? <PopUps /> : null}
			{loadingComp ? <Loading /> : null}
			{state.login ? <Login onClick={showLogin} /> : null}
			<div className="bg-primer">
				<div className="custom-navbar">
					<nav className="navbar navbar-expand-lg navbar-dark bg-primer">
						<Link to="/">
							<span className="navbar-brand pointer text-white">HR-Ways</span>
						</Link>
						<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" style={{ color: "white" }}>
							<span className="navbar-toggler-icon" style={{ color: "white" }}></span>
						</button>
						<div className="collapse navbar-collapse" id="navbarSupportedContent">
							<ul className="navbar-nav mr-auto">
								<li className="nav-item">
									<span className="nav-link pointer text-white">Dashboard</span>
								</li>
								{userData.role === "admin" ? (
									<>
										<Link to="/">
											<li className="nav-item">
												<span className="nav-link pointer text-white">Branch</span>
											</li>
										</Link>
									</>
								) : null}
								<li className="nav-item">
									<span className="nav-link pointer text-white">Employees</span>
								</li>
								{/* <li className="nav-item">
									<span className="nav-link pointer text-white">Calendar</span>
								</li> */}
								<li className="nav-item dropdown">
									<a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
										Time Management
									</a>
									<div className="dropdown-menu" aria-labelledby="navbarDropdown">
										<a className="dropdown-item" href="#">
											Absensi
										</a>
										<a className="dropdown-item" href="#">
											Cuti
										</a>
									</div>
								</li>
								{/* <li className="nav-item">
									<span className="nav-link pointer text-white">Finance</span>
								</li> */}
								<li className="nav-item dropdown">
									<a className="nav-link dropdown-toggle" href="#" id="navbarDropdown2" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
										Finance
									</a>
									<div className="dropdown-menu" aria-labelledby="navbarDropdown2">
										<a className="dropdown-item" href="#">
											Loan
										</a>
										<a className="dropdown-item" href="#">
											Reimbursement
										</a>
									</div>
								</li>
								<li className="nav-item">
									<span className="nav-link pointer text-white">Payroll</span>
								</li>
								<li className="nav-item dropdown">
									<a className="nav-link dropdown-toggle" href="#" id="navbarDropdown3" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
										Company
									</a>
									<div className="dropdown-menu" aria-labelledby="navbarDropdown3">
										<a className="dropdown-item" href="#">
											Settings
										</a>
									</div>
								</li>
								{userData.role === "admin" ? (
									<>
										<Link to="/admin/user">
											<li className="nav-item">
												<span className="nav-link pointer text-white">HR User</span>
											</li>
										</Link>
									</>
								) : null}
							</ul>

							<form className="form-inline my-2 my-lg-0">
								<span>
									Hello {isLogin ? userData.username : "Guest"},{" "}
									<span className="pointer" onClick={logout}>
										logout
									</span>
								</span>
							</form>
						</div>
					</nav>
				</div>
			</div>
		</>
	) : null;
};
const mapStateToProps = (state) => ({
	Auth: state.Auth,
	PopUpState: state.PopUp,
});

const mapDispatchToProps = { logout };

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);

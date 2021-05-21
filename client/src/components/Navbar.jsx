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
								{userData.role === "admin" ? (
									<>
										<Link to="/cabang">
											<li className="nav-item">
												<span className="nav-link pointer text-white">Cabang</span>
											</li>
										</Link>
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

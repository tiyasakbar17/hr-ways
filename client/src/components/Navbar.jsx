import React, { useState } from "react";
import { connect } from "react-redux";
import { logout } from "../redux/actions/Auth";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Loading from "./PopUps/Loading";
import PopUps from "./PopUps/PopUps";
import ProgressBar from "./PopUps/ProgressBar";

const Navbar = ({
	Auth: { isLogin, userData },
	PopUpState: {
		isPoped,
		progress: { isShown },
		loadingComp,
	},
	logout,
}) => {
	const innitialValue = {
		login: false,
		register: false,
	};

	const [state, setState] = useState(innitialValue);

	const showLogin = () => {
		setState((prevState) => ({ ...prevState, login: !prevState.login }));
	};
	const showRegister = () => {
		setState((prevState) => ({ ...prevState, register: !prevState.register }));
	};
	const changeShow = () => {
		setState((prevState) => ({ login: !prevState.login, register: !prevState.register }));
	};
	return (
		<>
			{isPoped ? <PopUps /> : null}
			{isShown ? <ProgressBar /> : null}
			{loadingComp ? <Loading /> : null}
			{state.login ? <Login onClick={showLogin} changeShow={changeShow} /> : null}
			{state.register ? <Register onClick={showRegister} changeShow={changeShow} /> : null}
			<div className="container">
				<nav className="navbar navbar-expand-lg navbar-light bg-light">
					<a className="navbar-brand pointer" href="/">
						My-Gazine
					</a>
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						{isLogin ? (
							<ul className="navbar-nav mr-auto">
								<li className="nav-item">
									<a className="nav-link pointer " href="/add-post">
										Add Post
									</a>
								</li>
								<li className="nav-item">
									<a className="nav-link pointer " href="/saved-post">
										Saved Posts
									</a>
								</li>
							</ul>
						) : (
							<ul className="navbar-nav mr-auto"></ul>
						)}

						<form className="form-inline my-2 my-lg-0">
							<span>
								Hello {isLogin ? userData.name : "Guest"},{" "}
								{isLogin ? (
									<span className="pointer" onClick={logout}>
										logout
									</span>
								) : (
									<>
										<span className="pointer" onClick={showLogin}>
											login
										</span>
										/{" "}
										<span className="pointer" onClick={showRegister}>
											register
										</span>
									</>
								)}
							</span>
						</form>
					</div>
				</nav>
			</div>
		</>
	);
};
const mapStateToProps = (state) => ({
	Auth: state.Auth,
	PopUpState: state.PopUp,
});

const mapDispatchToProps = { logout };

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);

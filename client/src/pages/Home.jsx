import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import Login from "../components/Auth/Login";
import Loading from "../components/PopUps/Loading";
import PopUps from "../components/PopUps/PopUps";
import useWindowDimensions from "../components/ScreenSize";

function Home({ Auth: { isLogin, userData }, PopUpState: { isPoped, loadingComp } }) {
	const { width, height } = useWindowDimensions();
	const innitialValue = {
		login: false,
	};

	const [state, setState] = useState(innitialValue);

	const showLogin = () => {
		setState((prevState) => ({ ...prevState, login: !prevState.login }));
	};
	return (
		<>
			{isLogin ? userData.role === "admin" ? <Redirect to="/admin" /> : <Redirect to="/user" /> : null}
			{isPoped ? <PopUps /> : null}
			{loadingComp ? <Loading /> : null}
			{state.login ? <Login onClick={showLogin} /> : null}
			<div className="home-container" style={{ width, height }}>
				<div className="wrapper" style={{ width: 0.9 * width, height: 0.9 * height }}>
					<div className="main-picture">
						<img src="https://picsum.photos/800/550" alt="gambar awal" className="main-image" />
					</div>
					<div className="login-side">
						<div className="text-center">
							<h3>Selamat Datang</h3>
						</div>
						<div className="shadow p-3 mb-5 bg-white rounded">
							<div className="card text-white bg-primer mb-3 main-item pointer">
								<div className="card-header text-center" onClick={showLogin}>
									Login
								</div>
							</div>
							<div className="card text-white bg-second mb-3 main-item pointer">
								<div className="card-header text-center">Periksa Data</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

const mapStateToProps = (state) => ({
	Auth: state.Auth,
	PopUpState: state.PopUp,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

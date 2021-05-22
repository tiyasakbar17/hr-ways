import React, { useEffect } from "react";
import "./App.css";
import { Provider } from "react-redux";
import Store from "./redux/store";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import UserRouter from "./components/routerLogin/UserRouter";
import SetAuthToken from "./redux/actions/setAuthToken";
import { loadData } from "./redux/actions/Auth";
import Home from "./pages/Home";
import Page404 from "./pages/Page404";
import useWindowDimensions from "./components/ScreenSize";
import Navbar from "./components/Navbar";
import AdminPage from "./pages/AdminPage";
import UserPage from "./pages/UserPage";
import KaryawanPage from "./pages/KaryawanPage";

function App() {
	const { width, height } = useWindowDimensions();
	if (localStorage.getItem("token")) {
		SetAuthToken(localStorage.getItem("token"));
	}
	useEffect(() => {
		if (localStorage.getItem("token")) {
			Store.dispatch(loadData());
		}
	}, []);
	return (
		<Provider store={Store}>
			<BrowserRouter>
				<div className="custom-body" style={{ minWidth: width, minHeight: height }}>
					<Navbar />
					<Switch>
						<Route exact path="/" component={Home} />
						<UserRouter exact path="/admin" role={["admin"]} component={AdminPage} />
						<UserRouter exact path="/admin/karyawan/:id" role={["admin"]} component={KaryawanPage} />
						<UserRouter exact path="/admin/user" role={["admin"]} component={UserPage} />
						<UserRouter exact path="/user" role={["cabang"]} component={UserPage} />
						<Route component={Page404} />
					</Switch>
				</div>
			</BrowserRouter>
		</Provider>
	);
}

export default App;

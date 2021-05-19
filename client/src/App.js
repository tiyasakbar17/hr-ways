import React, { useEffect } from "react";
import "./App.css";
import { Provider } from "react-redux";
import Store from "./redux/store";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import UserRouter from "./components/routerLogin/UserRouter";
import SetAuthToken from "./redux/actions/setAuthToken";
import { loadData } from "./redux/actions/Auth";
import LetterCounter from "./pages/LetterCounter";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AddPost from "./pages/AddPost";
import DetailPost from "./pages/DetailPost";
import SavedPost from "./pages/SavedPost";
import TryPage from "./pages/TryPage";

function App() {
	if (localStorage.getItem("token")) {
		SetAuthToken(localStorage.getItem("token"));
	}
	useEffect(() => {
		Store.dispatch(loadData());
	}, []);

	return (
		<Provider store={Store}>
			<BrowserRouter>
				<Navbar />
				<Switch>
					<Route exact path="/" component={Home} /> {/* Done */}
					<Route exact path="/task2" component={LetterCounter} /> {/* Done */}
					<Route exact path="/post/:id" component={DetailPost} />
					<Route exact path="/test" component={TryPage} />
					<UserRouter exact path="/add-post" component={AddPost} />
					<UserRouter exact path="/saved-post" component={SavedPost} />
				</Switch>
			</BrowserRouter>
		</Provider>
	);
}

export default App;

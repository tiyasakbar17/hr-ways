import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const LoginRoute = ({ component: Component, Auth, ...rest }) => {
	if (Auth.loading) {
		return <div className=""></div>;
	} else {
		return <Route {...rest} render={(props) => (Auth.isLogin ? <Component {...props} /> : <Redirect to="/" />)} />;
	}
};

const mapStateToProps = (state) => {
	return {
		Auth: state.Auth,
	};
};

export default connect(mapStateToProps)(LoginRoute);

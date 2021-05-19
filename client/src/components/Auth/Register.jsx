import React from "react";
import { connect } from "react-redux";
import { userRegister } from "../../redux/actions/Auth";

function Login({ onClick, userRegister, changeShow }) {
	const innitialValue = {
		email: "",
		password: "",
		fullName: "",
	};

	const [state, setState] = React.useState(innitialValue);

	const changeHandler = (e) => {
		setState((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
	};

	const submitHandler = (e) => {
		e.preventDefault();
		userRegister(state);
		onClick();
	};

	return (
		<div className="landingPop">
			<div className="modalBackground" onClick={onClick}></div>
			<div className="modalContainer">
				<div className="modalCloser pointer" onClick={onClick}>
					<i className="fas fa-times"></i>
				</div>
				<div className="modalTitle">
					<span>
						<strong>Register</strong>
					</span>
				</div>
				<div className="formContainer">
					<form onSubmit={submitHandler}>
						<div className="mb-1">
							<input type="email" className="form-control" name="email" value={state.email} placeholder="Email" onChange={changeHandler} required />
						</div>
						<div className="mb-1">
							<input type="password" className="form-control" name="password" value={state.password} placeholder="Password" onChange={changeHandler} required />
						</div>
						<div className="mb-1">
							<input type="text" className="form-control" name="fullName" value={state.fullName} placeholder="Full Name" onChange={changeHandler} required />
						</div>
						<div className="mb-1">
							<button type="submit" className="btn btn-success">
								Register
							</button>
						</div>
						<div className="modalInput">
							<span>
								Already Have an account ?{" "}
								<span onClick={changeShow} className="pointer">
									<strong>Click Here</strong>
								</span>
							</span>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default connect(null, { userRegister })(Login);

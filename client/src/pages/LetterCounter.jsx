import React, { useState } from "react";

function LetterCounter() {
	const innitialValue = {
		text: "",
		dataPrint: [],
	};
	const [state, setState] = useState(innitialValue);

	const changeHandler = (e) => {
		setState((prev) => ({ ...prev, text: e.target.value }));
	};

	const letterCounter = async () => {
		const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		const separatedText = state.text.toUpperCase().replace(/ /g, "").split("");
		const counter = await alphabet.split("").map((letter) => {
			const copyText = [...separatedText];
			return { [letter]: copyText.filter((text) => text === letter).length };
		});
		setState((prev) => ({ ...prev, dataPrint: counter }));
	};

	return (
		<div className="container">
			<div>
				<div className="mt-4 d-flex justify-content-center text-primary">
					<h1>Article</h1>
				</div>
				<div className="mt-2">
					<textarea className="form-control form-control-sm" style={{ minHeight: "300px" }} value={state.text} onChange={(e) => changeHandler(e)} />
				</div>
				<div className="mt-4 d-flex justify-content-center">
					<button className="btn btn-success" onClick={letterCounter}>
						count
					</button>
				</div>
				<div className="mt-3 text-primary">
					<h1>Result</h1>
				</div>
				<div className="mt-2 mb-5">
					{state.dataPrint.map((data, i) => (
						<div key={i}> {JSON.stringify(data).replace(/"|{|}/g, "")} </div>
					))}
				</div>
			</div>
		</div>
	);
}

export default LetterCounter;

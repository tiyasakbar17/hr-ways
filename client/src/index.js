import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";

const client = new ApolloClient({
	cache: new InMemoryCache(),
	//@ts-ignore
	link: createUploadLink({
		// uri: "https://us-central1-weddingways-bb7b2.cloudfunctions.net/app/api/v1/graphql",
		uri: "https://us-central1-weddingways-bb7b2.cloudfunctions.net/tryApp/api/v1/graphql",
		// uri: "http://localhost:5000/api/v1/graphql",
		// uri: "http://localhost:5001/graphql",
	}),
});

ReactDOM.render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

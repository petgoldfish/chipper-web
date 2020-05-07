import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient, {
	InMemoryCache,
	NormalizedCacheObject,
} from "apollo-boost";

import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { getAuthToken } from "./authToken";

const client = new ApolloClient<NormalizedCacheObject>({
	uri: process.env.REACT_APP_API_SERVER_URL,
	cache: new InMemoryCache(),
	request: (operation) => {
		const token = getAuthToken();
		operation.setContext({
			headers: {
				authorization: token ? `Bearer ${token}` : "",
			},
		});
	},
});

ReactDOM.render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

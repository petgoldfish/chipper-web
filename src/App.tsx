import { Router } from "@reach/router";
import React, { ReactElement } from "react";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import AuthContextProvider from "./context/AuthContext";
import Home from "./components/Home/Home";
import Me from "./components/Me/Me";

function App(): ReactElement {
	return (
		<AuthContextProvider>
			<div className="App flex-column">
				<Header />
				<div className="main flex-column">
					<Router>
						<Home path="/" default={true} />
						<Me path="/me" />
					</Router>
				</div>
				<Footer />
			</div>
		</AuthContextProvider>
	);
}

export default App;

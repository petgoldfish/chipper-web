import { Router } from "@reach/router";
import React, { ReactElement } from "react";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Me from "./components/Me/Me";
import AuthContextProvider from "./context/AuthContext";

function App(): ReactElement {
	return (
		<AuthContextProvider>
			<div className="App flex-column">
				<Header />
				<Router className="main flex-column">
					<Home path="/" default={true} />
					<Me path="/me" />
				</Router>
				<Footer />
			</div>
		</AuthContextProvider>
	);
}

export default App;

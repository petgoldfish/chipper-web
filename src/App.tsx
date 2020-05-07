import "./App.css";

import React, { ReactElement } from "react";

import ChirpForm from "./components/ChirpForm/ChirpForm";
import ChirpList from "./components/ChirpList/ChirpList";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import AuthContextProvider from "./context/AuthContext";

function App(): ReactElement {
	return (
		<AuthContextProvider>
			<div className="App flex-column">
				<Header />
				<div className="main flex-column">
					<ChirpForm />
					<ChirpList />
				</div>
				<Footer />
			</div>
		</AuthContextProvider>
	);
}

export default App;

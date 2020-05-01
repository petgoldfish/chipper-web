import "./App.css";

import React from "react";

import ChirpForm from "./components/ChirpForm/ChirpForm";
import ChirpList from "./components/ChirpList/ChirpList";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
	return (
		<div className="App flex-column">
			<Header />
			<div className="main flex-column">
				<ChirpForm />
				<ChirpList />
			</div>
			<Footer />
		</div>
	);
}

export default App;

import React from "react";

import ChirpForm from "./components/ChirpForm/ChirpForm";
import ChirpList from "./components/ChirpList/ChirpList";

import "./App.css";

function App() {
	return (
		<div className="App flex-column">
			<div className="main flex-column">
				<ChirpForm />
				<ChirpList />
			</div>
		</div>
	);
}

export default App;

import React from "react";

import ChirpCard from "../ChirpCard/ChirpCard";

import "./ChirpList.css";

export default function ChirpList() {
	return (
		<div className="chirp-list flex-column">
			This is the Chirp List.
			<ChirpCard />
		</div>
	);
}

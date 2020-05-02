import "./ChirpForm.css";

import React from "react";

export default function ChirpForm() {
	return (
		<div className="chirp-form flex-column">
			<textarea
				className="chirp-form__textarea card"
				placeholder="what's buggin' ya?"
				aria-label="Chirp Text"
			/>
			<button className="button card" type="submit">
				chirp!
			</button>
		</div>
	);
}

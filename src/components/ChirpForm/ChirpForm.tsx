import React from "react";

import "./ChirpForm.css";

export default function ChirpForm() {
	return (
		<div className="chirp-form flex-column">
			<textarea
				className="chirp-form__textarea card"
				placeholder="what's buggin' ya?"
				aria-label="Chirp Text"
			/>
			<button className="chirp-form__button card" type="submit">chirp!</button>
		</div>
	);
}

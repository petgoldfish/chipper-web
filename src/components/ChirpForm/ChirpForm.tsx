import "./ChirpForm.css";

import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function ChirpForm() {
	const { authenticated } = useContext(AuthContext);

	return (
		authenticated ? (
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
		) : null
	);
}

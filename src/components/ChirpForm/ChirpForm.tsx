import "./ChirpForm.css";

import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function ChirpForm() {
	const { authenticated } = useContext(AuthContext);
	const [auth, setAuth] = useState(false);

	useEffect(() => {
		setAuth(authenticated);
	}, [authenticated])

	return (
		auth ? (
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

import "./Header.css";

import React, { useState, useContext } from "react";
import LoginRegisterModal from "../LoginRegisterModal/LoginRegisterModal";
import { AuthContext } from "../../context/AuthContext";
import { setAuthToken } from "../../authToken";

export default function Header() {
	const [showModal, setShowModal] = useState(false);
	const { authenticated, setAuthenticated } = useContext(AuthContext);

	function logout() {
		setAuthToken(null);
		setAuthenticated(false);
	}

	return (
		<div className="chipper__header">
			<h1 className="chipper__header__title">chipper</h1>
			{authenticated ? (
				<button
					className="chipper__header__login button card"
					onClick={logout}
				>
					logout
				</button>
			) : (
				<button
					className="chipper__header__login button card"
					onClick={(e) => setShowModal(true)}
				>
					login
				</button>
			)}
			<LoginRegisterModal showModal={showModal} setShowModal={setShowModal} />
		</div>
	);
}

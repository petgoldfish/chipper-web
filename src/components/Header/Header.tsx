import "./Header.css";

import React, { useState, useContext } from "react";
import LoginRegisterModal from "../LoginRegisterModal/LoginRegisterModal";
import { AuthContext } from "../../context/AuthContext";
import { setAuthToken } from "../../authToken";

export default function Header() {
	const [showModal, setShowModal] = useState(false);
	const [isLogin, setIsLogin] = useState(true);
	const { authenticated, setAuthenticated } = useContext(AuthContext);

	function logout() {
		setAuthToken(null);
		setAuthenticated(false);
	}

	function handleAuthClick(login: boolean) {
		setIsLogin(login);
		setShowModal(true);
	}

	return (
		<div className="chipper__header">
			<h1 className="chipper__header__title">chipper</h1>
			{authenticated ? (
				<button className="chipper__header__login button card" onClick={logout}>
					logout
				</button>
			) : (
				<>
					<button
						className="chipper__header__login button card"
						onClick={(e) => handleAuthClick(false)}
					>
						signup
					</button>
					<button
						className="chipper__header__login button card"
						onClick={(e) => handleAuthClick(true)}
					>
						login
					</button>
				</>
			)}
			<LoginRegisterModal
				showModal={showModal}
				setShowModal={setShowModal}
				isLogin={isLogin}
				setIsLogin={setIsLogin}
			/>
		</div>
	);
}

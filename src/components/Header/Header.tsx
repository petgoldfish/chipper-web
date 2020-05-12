import "./Header.css";

import React, { useState, useContext } from "react";
import LoginRegisterModal from "../LoginRegisterModal/LoginRegisterModal";
import { AuthContext } from "../../context/AuthContext";
import { setAuthToken } from "../../authToken";
import { Link, navigate } from "@reach/router";

export default function Header() {
	const [showModal, setShowModal] = useState(false);
	const [isLogin, setIsLogin] = useState(true);
	const { authenticated, setAuthenticated } = useContext(AuthContext);

	function logout() {
		setAuthToken(null);
		setAuthenticated(false);
		navigate("/");
	}

	function handleAuthClick(login: boolean) {
		setIsLogin(login);
		setShowModal(true);
	}

	return (
		<div className="chipper__header">
			<div className="header__title">
				<Link className="header__link" to="/">
					chipper
				</Link>
			</div>
			{authenticated ? (
				<>
					<Link to="/me">
						<button className="header__login button card">me</button>
					</Link>
					<button className="header__login button card" onClick={logout}>
						logout
					</button>
				</>
			) : (
				<>
					<button
						className="header__login button card"
						onClick={(e) => handleAuthClick(false)}
					>
						signup
					</button>
					<button
						className="header__login button card"
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

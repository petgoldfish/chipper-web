import "./Header.css";

import React, { useState } from "react";
import LoginRegisterModal from "../LoginRegisterModal/LoginRegisterModal";

export default function Header() {
	const [showModal, setShowModal] = useState(false);

	return (
		<div className="chipper__header">
			<h1 className="chipper__header__title">chipper</h1>
			<button
				className="chipper__header__login button card"
				onClick={(e) => setShowModal(true)}
			>
				login
			</button>
			<LoginRegisterModal showModal={showModal} setShowModal={setShowModal} />
		</div>
	);
}

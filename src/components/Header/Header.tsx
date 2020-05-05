import "./Header.css";

import React, { useState } from "react";
import ReactModal from "react-modal";

export default function Header() {
	const [showModal, setShowModal] = useState(false);

	const openModal = () => {
		setShowModal(true);
	};

	const closeModal = () => {
		setShowModal(false);
	};

	return (
		<div className="chipper__header">
			<h1 className="chipper__header__title">chipper</h1>
			<button
				className="chipper__header__login button card"
				onClick={openModal}
			>
				login
			</button>
			<ReactModal
				isOpen={showModal}
				style={{
					overlay: {
						backgroundColor: "#616161aa",
					},
					content: {
						backgroundColor: "#424242",
						border: "none",
						borderRadius: 8,
						color: "whitesmoke",
						width: "50%",
						height: "50%",
						margin: "auto",
						display: "flex",
						flexDirection: "column"
					},
				}}
				contentLabel={"Login/Register Modal"}
				onRequestClose={(e) => closeModal}
				shouldCloseOnEsc={true}
				shouldCloseOnOverlayClick={true}
				shouldFocusAfterRender={true}
				shouldReturnFocusAfterClose={true}
				appElement={document.getElementById("root")!}
			>
				<button style={{alignSelf: "flex-end"}} onClick={closeModal}>X</button>
				<p>test</p>
			</ReactModal>
		</div>
	);
}

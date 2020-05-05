import "./LoginRegisterModal.css";

import React from "react";
import ReactModal from "react-modal";

type propTypes = {
	showModal: boolean;
	setShowModal: Function;
};

export default function LoginRegisterModal({
	showModal,
	setShowModal,
}: propTypes) {
	return (
		<ReactModal
			isOpen={showModal}
			className="login-register-modal__content"
			overlayClassName="login-register-modal__overlay"
			contentLabel={"Login/Register Modal"}
			onRequestClose={(e) => setShowModal(false)}
			appElement={document.getElementById("root")!}
		>
			<button
				className="button card login-register-modal__button"
				onClick={(e) => setShowModal(false)}
			>
				X
			</button>
			<p>test</p>
		</ReactModal>
	);
}

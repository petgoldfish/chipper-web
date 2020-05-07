import React from "react";
import ReactModal from "react-modal";
import LoginForm from "../LoginForm/LoginForm";

type PropTypes = {
	showModal: boolean;
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function LoginRegisterModal({
	showModal,
	setShowModal,
}: PropTypes) {
	return (
		<ReactModal
			isOpen={showModal}
			style={{
				overlay: {
					backgroundColor: "#ffffff40",
				},
				content: {
					display: "flex",
					flexDirection: "column",
					backgroundColor: "var(--secondary)",
					boxShadow: "var(--shadow)",
					borderRadius: "var(--rounding)",
					height: 350,
					width: 350,
					maxHeight: "75%",
					maxWidth: "75%",
					margin: "auto",
					border: "none",
				},
			}}
			contentLabel="Login/Register Modal"
			onRequestClose={(e) => setShowModal(false)}
			appElement={document.getElementById("root")!}
		>
			<button
				className="button card login-register-modal__close"
				onClick={(e) => setShowModal(false)}
			>
				X
			</button>
			<LoginForm setShowModal={setShowModal} />
		</ReactModal>
	);
}

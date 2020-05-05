import "./LoginRegisterModal.css";

import React from "react";
import ReactModal from "react-modal";
import { Formik, Form, Field, ErrorMessage } from "formik";

type propTypes = {
	showModal: boolean;
	setShowModal: Function;
};

export default function LoginRegisterModal({
	showModal,
	setShowModal,
}: propTypes) {
	const handleLogin = () => {};

	return (
		<ReactModal
			isOpen={showModal}
			className="login-register-modal__content card card--secondary"
			overlayClassName="login-register-modal__overlay"
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
			<Formik
				initialValues={{ username: "", password: "" }}
				onSubmit={handleLogin}
			>
				<Form className="flex-column">
					<Field
						name="username"
						type="text"
						className="card login-register-modal__input"
						placeHolder="username"
						aria-label="username"
					/>
					<ErrorMessage name="username" />
					<Field
						name="password"
						type="password"
						className="card login-register-modal__input"
						placeHolder="password"
						aria-label="password"
					/>
					<ErrorMessage name="password" />
					<button className="button card">login</button>
				</Form>
			</Formik>
		</ReactModal>
	);
}

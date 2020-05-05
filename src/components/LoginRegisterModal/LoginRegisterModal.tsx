import "./LoginRegisterModal.css";

import React from "react";
import ReactModal from "react-modal";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { object, string } from "yup";

type PropTypes = {
	showModal: boolean;
	setShowModal: Function;
};

type LoginFormValues = {
	username: string;
	password: string;
};

export default function LoginRegisterModal({
	showModal,
	setShowModal,
}: PropTypes) {
	const initialValues: LoginFormValues = { username: "", password: "" };

	const handleLogin = (
		values: LoginFormValues,
		actions: FormikHelpers<LoginFormValues>
	) => {
		actions.resetForm();
		setShowModal(false);
	};

	const loginSchema = object().shape({
		username: string().required("username is required"),
		password: string().required("password is required"),
	});

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
				initialValues={initialValues}
				validationSchema={loginSchema}
				onSubmit={handleLogin}
			>
				{({isSubmitting}) => (
					<Form className="flex-column">
						<Field
							name="username"
							type="text"
							className="card login-register-modal__input"
							placeholder="username"
							aria-label="username"
						/>
						<ErrorMessage name="username">
							{(error) => (
								<div className="login-register-modal__error">{error}</div>
							)}
						</ErrorMessage>
						<Field
							name="password"
							type="password"
							className="card login-register-modal__input"
							placeholder="password"
							aria-label="password"
						/>
						<ErrorMessage name="password">
							{(error) => (
								<div className="login-register-modal__error">{error}</div>
							)}
						</ErrorMessage>
						<button disabled={isSubmitting} className="button card" type="submit">
							login
						</button>
					</Form>
				)}
			</Formik>
		</ReactModal>
	);
}

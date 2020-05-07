import "./LoginRegisterModal.css";

import React from "react";
import ReactModal from "react-modal";
import gql from "graphql-tag";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { object, string } from "yup";
import { useMutation } from "@apollo/react-hooks";
import { LoginMutation } from "../../generated/graphql";
import { setAuthToken } from "../../authToken";

type PropTypes = {
	showModal: boolean;
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

type LoginFormValues = {
	username: string;
	password: string;
};

const LOGIN_MUTATION = gql`
	mutation login($username: String!, $password: String!) {
		login(name: $username, password: $password) {
			token
			userId
		}
	}
`;

export default function LoginRegisterModal({
	showModal,
	setShowModal,
}: PropTypes) {
	const [login, { error }] = useMutation<LoginMutation>(LOGIN_MUTATION);
	const initialValues: LoginFormValues = { username: "", password: "" };

	const handleLogin = async (
		{ username, password }: LoginFormValues,
		actions: FormikHelpers<LoginFormValues>
	) => {
		actions.resetForm();
		actions.setSubmitting(true);
		const { data } = await login({ variables: { username, password } });
		setAuthToken(data?.login.token);
		actions.setSubmitting(false);
		setShowModal(false);
	};

	const loginValidationSchema = object().shape({
		username: string().required("username is required"),
		password: string().required("password is required"),
	});

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
			<Formik
				initialValues={initialValues}
				validationSchema={loginValidationSchema}
				onSubmit={handleLogin}
			>
				{({ isSubmitting }) => (
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
						<button
							disabled={isSubmitting}
							className="button card"
							type="submit"
						>
							login
						</button>
						{error &&
							error.graphQLErrors.map((gqlError, index) => (
								<div key={index} className="login-register-modal__error">
									{gqlError.message}
								</div>
							))}
						{error && error.networkError && (
							<div className="login-register-modal__error">
								error connecting to server :(
							</div>
						)}
					</Form>
				)}
			</Formik>
		</ReactModal>
	);
}

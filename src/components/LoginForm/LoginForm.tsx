import "./LoginForm.css";

import React, { ReactElement } from "react";
import gql from "graphql-tag";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { object, string } from "yup";
import { useMutation } from "@apollo/react-hooks";
import { LoginMutation } from "../../generated/graphql";
import { setAuthToken } from "../../authToken";

interface Props {
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface LoginFormValues {
	username: string;
	password: string;
}

const LOGIN_MUTATION = gql`
	mutation login($username: String!, $password: String!) {
		login(name: $username, password: $password) {
			token
			userId
		}
	}
`;

export default function LoginForm({ setShowModal }: Props): ReactElement {
	const [login, { error }] = useMutation<LoginMutation>(LOGIN_MUTATION);
	const initialValues: LoginFormValues = { username: "", password: "" };

	const handleLogin = async (
		{ username, password }: LoginFormValues,
		actions: FormikHelpers<LoginFormValues>
	) => {
		actions.setSubmitting(true);
		const { data } = await login({ variables: { username, password } });
		setAuthToken(data?.login.token);
		actions.setSubmitting(false);
		actions.resetForm();
		setShowModal(false);
	};

	const loginValidationSchema = object().shape({
		username: string().required("username is required"),
		password: string().required("password is required"),
	});

	return (
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
						className="card login-form__input"
						placeholder="username"
						aria-label="username"
					/>
					<ErrorMessage name="username">
						{(error) => (
							<div className="login-form__error">{error}</div>
						)}
					</ErrorMessage>
					<Field
						name="password"
						type="password"
						className="card login-form__input"
						placeholder="password"
						aria-label="password"
					/>
					<ErrorMessage name="password">
						{(error) => (
							<div className="login-form__error">{error}</div>
						)}
					</ErrorMessage>
					<button disabled={isSubmitting} className="button card" type="submit">
						login
					</button>
					{error &&
						error.graphQLErrors.map((gqlError, index) => (
							<div key={index} className="login-form__error">
								{gqlError.message}
							</div>
						))}
					{error && error.networkError && (
						<div className="login-form__error">
							error connecting to server :(
						</div>
					)}
				</Form>
			)}
		</Formik>
	);
}

import "./AuthForm.css";

import React, { ReactElement, useContext } from "react";
import gql from "graphql-tag";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { object, string } from "yup";
import { useMutation } from "@apollo/react-hooks";
import { LoginMutation } from "../../generated/graphql";
import { setAuthToken } from "../../authToken";
import { AuthContext } from "../../context/AuthContext";

interface Props {
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface LoginFormValues {
	username: string;
	password: string;
}

const LOGIN_MUTATION = gql`
	mutation login($username: String!, $password: String!) {
		login(name: $username, password: $password)
	}
`;

export default function LoginForm({ setShowModal }: Props): ReactElement {
	const { setAuthenticated } = useContext(AuthContext);

	const [login, { error }] = useMutation<LoginMutation>(LOGIN_MUTATION, {
		onError: (e) => {
			/* handled via above error object */
		},
	});
	const initialValues: LoginFormValues = { username: "", password: "" };

	const loginValidationSchema = object().shape<LoginFormValues>({
		username: string().required("username is required"),
		password: string().required("password is required"),
	});

	const handleLogin = async (
		{ username, password }: LoginFormValues,
		actions: FormikHelpers<LoginFormValues>
	) => {
		actions.setSubmitting(true);
		const { data } = await login({ variables: { username, password } });
		setAuthToken(data?.login);
		setAuthenticated(true);
		actions.setSubmitting(false);
		actions.resetForm();
		setShowModal(false);
	};

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
						className="card auth-form__input"
						placeholder="username"
						aria-label="username"
					/>
					<ErrorMessage name="username">
						{(error) => <div className="form__error">{error}</div>}
					</ErrorMessage>
					<Field
						name="password"
						type="password"
						className="card auth-form__input"
						placeholder="password"
						aria-label="password"
					/>
					<ErrorMessage name="password">
						{(error) => <div className="form__error">{error}</div>}
					</ErrorMessage>
					<button disabled={isSubmitting} className="button card" type="submit">
						login
					</button>
					{error &&
						error.graphQLErrors.map((gqlError, index) => (
							<div key={index} className="form__error">
								{gqlError.message}
							</div>
						))}
					{error && error.networkError && (
						<div className="form__error">
							error connecting to server :(
						</div>
					)}
				</Form>
			)}
		</Formik>
	);
}

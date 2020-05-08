import React, { ReactElement } from "react";
import { Formik, FormikHelpers, Form, Field, ErrorMessage } from "formik";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { SignupMutation } from "../../generated/graphql";
import { object, string, ref } from "yup";

interface SignupFormValues {
	username: string;
	password: string;
	passwordConfirm: string;
}

interface Props {
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const SIGNUP_MUTATION = gql`
	mutation signup($username: String!, $password: String!) {
		signup(name: $username, password: $password) {
			id
		}
	}
`;

export default function RegisterForm({ setShowModal }: Props): ReactElement {
	const [signup, { error }] = useMutation<SignupMutation>(SIGNUP_MUTATION, {
		onError: (e) => {
			/* handled via above error object */
		},
	});

	const initialValues: SignupFormValues = {
		username: "",
		password: "",
		passwordConfirm: "",
	};

	const signupValidationSchema = object().shape<SignupFormValues>({
		username: string().required("username is required").min(6),
		password: string().required("password is required").min(6),
		passwordConfirm: string()
			.required("please confirm password")
			.oneOf([ref("password")], "passwords do not match"),
	});

	const handleSignup = async (
		{ username, password, passwordConfirm }: SignupFormValues,
		actions: FormikHelpers<SignupFormValues>
	) => {
		actions.setSubmitting(true);
		await signup({ variables: { username, password, passwordConfirm } });
		actions.resetForm();
		actions.setSubmitting(false);
	};

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={signupValidationSchema}
			onSubmit={handleSignup}
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
						{(error) => <div className="auth-form__error">{error}</div>}
					</ErrorMessage>
					<Field
						name="password"
						type="password"
						className="card auth-form__input"
						placeholder="password"
						aria-label="password"
					/>
					<ErrorMessage name="password">
						{(error) => <div className="auth-form__error">{error}</div>}
					</ErrorMessage>
					<Field
						name="passwordConfirm"
						type="password"
						className="card auth-form__input"
						placeholder="confirm password"
						aria-label="confirm password"
					/>
					<ErrorMessage name="passwordConfirm">
						{(error) => <div className="auth-form__error">{error}</div>}
					</ErrorMessage>
					<button disabled={isSubmitting} className="button card" type="submit">
						register
					</button>
					{error &&
						error.graphQLErrors.map((gqlError, index) => (
							<div key={index} className="auth-form__error">
								{gqlError.message}
							</div>
						))}
					{error && error.networkError && (
						<div className="auth-form__error">
							error connecting to server :(
						</div>
					)}
				</Form>
			)}
		</Formik>
	);
}

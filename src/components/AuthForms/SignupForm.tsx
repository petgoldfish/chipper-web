import { useMutation } from "@apollo/react-hooks";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import gql from "graphql-tag";
import React, { ReactElement } from "react";
import { object, ref, string } from "yup";
import { SignupMutation } from "../../generated/graphql";
import "./AuthForm.css";

interface SignupFormValues {
	username: string;
	password: string;
	passwordConfirm: string;
}

interface Props {
	setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const SIGNUP_MUTATION = gql`
	mutation signup($username: String!, $password: String!) {
		signup(name: $username, password: $password)
	}
`;

export default function SignupForm({ setIsLogin }: Props): ReactElement {
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
		const data = await signup({
			variables: { username, password, passwordConfirm },
		});
		actions.resetForm();
		actions.setSubmitting(false);
		if (!data.errors) {
			setIsLogin(true);
		}
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
					<Field
						name="passwordConfirm"
						type="password"
						className="card auth-form__input"
						placeholder="confirm password"
						aria-label="confirm password"
					/>
					<ErrorMessage name="passwordConfirm">
						{(error) => <div className="form__error">{error}</div>}
					</ErrorMessage>
					<button disabled={isSubmitting} className="button card" type="submit">
						signup
					</button>
					{error &&
						error.graphQLErrors.map((gqlError, index) => (
							<div key={index} className="form__error">
								{gqlError.message}
							</div>
						))}
					{error && error.networkError && (
						<div className="form__error">error connecting to server :(</div>
					)}
				</Form>
			)}
		</Formik>
	);
}

import "./ChirpForm.css";

import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { FEED_QUERY } from "../Home/Home";
import { Formik, FormikHelpers, Form, Field, ErrorMessage } from "formik";
import { AddChirpMutation } from "../../generated/graphql";
import { object, string } from "yup";

interface ChirpFormValues {
	content: string;
}

const ADD_CHIRP_MUTATION = gql`
	mutation addChirp($content: String!) {
		addChirp(content: $content)
	}
`;

export default function ChirpForm() {
	const { authenticated } = useContext(AuthContext);
	const [addChirp] = useMutation<AddChirpMutation>(ADD_CHIRP_MUTATION, {
		refetchQueries: [{ query: FEED_QUERY }],
	});

	const initialValues: ChirpFormValues = { content: "" };

	const addChirpValidationSchema = object().shape<ChirpFormValues>({
		content: string().required("chirp content is required").max(140),
	});

	const handleSubmit = async (
		{ content }: ChirpFormValues,
		actions: FormikHelpers<ChirpFormValues>
	) => {
		actions.setSubmitting(true);
		await addChirp({ variables: { content } });
		actions.resetForm();
		actions.setSubmitting(false);
	};

	return authenticated ? (
		<Formik
			initialValues={initialValues}
			onSubmit={handleSubmit}
			validationSchema={addChirpValidationSchema}
		>
			{({ isSubmitting }) => (
				<Form>
					<div className="chirp-form flex-column">
						<Field
							name="content"
							as="textarea"
							className="chirp-form__textarea card"
							placeholder="what's buggin' ya?"
							aria-label="Chirp Text"
							maxLength={140}
						/>
						<ErrorMessage name="content">
							{(error) => <div className="form__error">{error}</div>}
						</ErrorMessage>
						<button
							disabled={isSubmitting}
							className="button card"
							type="submit"
						>
							chirp!
						</button>
					</div>
				</Form>
			)}
		</Formik>
	) : null;
}

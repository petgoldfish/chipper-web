import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import React from "react";
import { format } from "timeago.js";
import {
	Chirp,
	DeleteChirpMutation,
	DeleteChirpMutationVariables,
} from "../../generated/graphql";
import { ME_QUERY } from "../Me/Me";
import "./ChirpCard.css";

type ChirpCardProps = {
	chirp: Partial<Chirp>;
};

const DELETE_CHIRP_MUTATION = gql`
	mutation deleteChirp($chirpID: Float!) {
		deleteChirp(id: $chirpID)
	}
`;

export default function ChirpCard({ chirp }: ChirpCardProps) {
	const [deleteChirp] = useMutation<
		DeleteChirpMutation,
		DeleteChirpMutationVariables
	>(DELETE_CHIRP_MUTATION, {
		refetchQueries: [{ query: ME_QUERY }],
	});

	return (
		<div className="card chirp-card">
			<div className="flex-column chirp-card__main">
				<div className="chirp-card__content">{chirp.content}</div>
				<div className="chirp-card__meta">
					{chirp.author?.name || "me"} &bull; {format(chirp.createdAt)}
				</div>
			</div>
			{!chirp.author?.name ? (
				<button
					className="chirp-card__del card button button--danger"
					onClick={async (e) => {
						await deleteChirp({ variables: { chirpID: Number(chirp.id) } });
					}}
				>
					delete
				</button>
			) : null}
		</div>
	);
}

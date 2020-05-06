import "./ChirpList.css";

import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { FeedQuery, Chirp } from "../../generated/graphql";

import ChirpCard from "../ChirpCard/ChirpCard";

const FEED_QUERY = gql`
	query feed {
		feed {
			id
			content
			createdAt
			author {
				id
				name
			}
		}
	}
`;

export default function ChirpList() {
	const { loading, error, data } = useQuery<FeedQuery>(FEED_QUERY);

	if (loading) {
		return <div className="chirp-list flex-column">loading chirps...</div>;
	}

	if (error || !data) {
		return (
			<div className="chirp-list flex-column">error getting chirp feed :(</div>
		);
	}

	return (
		<div className="chirp-list flex-column">
			{data.feed?.map((chirp: Chirp) => (
				<ChirpCard key={chirp.id} chirp={chirp} />
			))}
		</div>
	);
}

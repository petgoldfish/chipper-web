import { useQuery } from "@apollo/react-hooks";
import { RouteComponentProps } from "@reach/router";
import { gql } from "apollo-boost";
import React, { ReactElement } from "react";
import { FeedQuery } from "../../generated/graphql";
import ChirpForm from "../ChirpForm/ChirpForm";
import ChirpList from "../ChirpList/ChirpList";

interface Props {}

export const FEED_QUERY = gql`
	query feed {
		feed {
			id
			content
			createdAt
			author {
				name
			}
		}
	}
`;

export default function Home(props: Props & RouteComponentProps): ReactElement {
	const { loading, error, data } = useQuery<FeedQuery>(FEED_QUERY, {
		fetchPolicy: "cache-and-network",
	});

	return (
		<>
			<ChirpForm />
			{loading ? (
				<div className="chirp-list flex-column">loading chirps...</div>
			) : error || !data ? (
				<div className="chirp-list flex-column">
					error getting chirp feed :(
				</div>
			) : (
				<ChirpList chirps={data.feed} />
			)}
		</>
	);
}

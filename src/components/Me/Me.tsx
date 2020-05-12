import React, { ReactElement, useContext } from "react";
import { RouteComponentProps } from "@reach/router";
import { AuthContext } from "../../context/AuthContext";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { MeQuery } from "../../generated/graphql";
import ChirpList from "../ChirpList/ChirpList";

interface Props {}

export const ME_QUERY = gql`
	query me {
		me {
			name
			chirps {
				id
				content
				createdAt
			}
		}
	}
`;

export default function Me(props: Props & RouteComponentProps): ReactElement {
	const { authenticated } = useContext(AuthContext);
	const { loading, error, data } = useQuery<MeQuery>(ME_QUERY);

	return authenticated ? (
		<>
			<div className="card">{data?.me.name}</div>
			{loading ? (
				<div className="chirp-list flex-column">loading chirps...</div>
			) : error || !data ? (
				<div className="chirp-list flex-column">
					error getting chirp feed :(
				</div>
			) : (
				<ChirpList chirps={data.me.chirps} />
			)}
		</>
	) : (
		<div>you must be authenticated to view this page</div>
	);
}

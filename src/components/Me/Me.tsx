import { useMutation, useQuery } from "@apollo/react-hooks";
import { RouteComponentProps } from "@reach/router";
import { gql } from "apollo-boost";
import React, { ReactElement, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { MeQuery } from "../../generated/graphql";
import ChirpList from "../ChirpList/ChirpList";
import "./Me.css";

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

const DELETE_ACCOUNT_MUTATION = gql`
	mutation deleteAccount {
		deleteUser
	}
`;

const DELETE_CHIRPS_MUTATION = gql`
	mutation deleteChirps {
		deleteChirps
	}
`;

export default function Me(props: Props & RouteComponentProps): ReactElement {
	const { authenticated, logout } = useContext(AuthContext);
	const { loading, error, data } = useQuery<MeQuery>(ME_QUERY);

	const [deleteAccount] = useMutation(DELETE_ACCOUNT_MUTATION);
	const [deleteChirps, { called }] = useMutation(DELETE_CHIRPS_MUTATION);

	async function handleDeleteAccount() {
		await deleteAccount();
		logout();
	}

	async function handleDeleteChirps() {
		await deleteChirps();
	}

	return authenticated ? (
		<>
			<div className="card flex-column">
				<h2>{data?.me.name}</h2>
				<button
					className="deleteButton card button button--danger"
					onClick={handleDeleteChirps}
				>
					delete chirps
				</button>
				<button
					className="deleteButton card button button--danger"
					onClick={handleDeleteAccount}
				>
					delete account
				</button>
			</div>
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

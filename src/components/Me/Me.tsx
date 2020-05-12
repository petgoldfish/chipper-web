import React, { ReactElement, useContext } from "react";
import { RouteComponentProps } from "@reach/router";
import { AuthContext } from "../../context/AuthContext";

interface Props {}

export default function Me(props: Props & RouteComponentProps): ReactElement {
	const { authenticated } = useContext(AuthContext);

	return authenticated ? (
		<div>Me</div>
	) : (
		<div>you must be authenticated to view this page</div>
	);
}

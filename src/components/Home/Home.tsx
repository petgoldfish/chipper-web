import React, { ReactElement } from "react";
import ChirpForm from "../ChirpForm/ChirpForm";
import ChirpList from "../ChirpList/ChirpList";
import { RouteComponentProps } from "@reach/router";

interface Props {}

export default function Home(props: Props & RouteComponentProps): ReactElement {
	return (
		<>
			<ChirpForm />
			<ChirpList />
		</>
	);
}

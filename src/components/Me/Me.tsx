import React, { ReactElement } from "react";
import { RouteComponentProps } from "@reach/router";

interface Props {}

export default function Me(props: Props & RouteComponentProps): ReactElement {
	return <div>Me</div>;
}

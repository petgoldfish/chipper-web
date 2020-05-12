import React from "react";
import { Chirp } from "../../generated/graphql";
import ChirpCard from "../ChirpCard/ChirpCard";
import "./ChirpList.css";

interface Props {
	chirps: Array<Partial<Chirp>> | null | undefined;
}

export default function ChirpList({ chirps }: Props) {
	return (
		<div className="chirp-list flex-column">
			{chirps?.map((chirp) => (
				<ChirpCard key={chirp.id} chirp={chirp} />
			))}
		</div>
	);
}

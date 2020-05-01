import "./ChirpCard.css";

import React from "react";
import { Chirp } from "../../generated/graphql";

type ChirpCardProps = {
	chirp: Chirp;
};

export default function ChirpCard({ chirp }: ChirpCardProps) {
	return (
		<div className="card flex-column chirp-card">
			<div className="chirp-card__content">{chirp.content}</div>
			<div className="chirp-card__meta">Metadata</div>
		</div>
	);
}

import "./ChirpCard.css";

import React from "react";
import { Chirp } from "../../generated/graphql";
import { format } from "timeago.js";

type ChirpCardProps = {
	chirp: Partial<Chirp>;
};

export default function ChirpCard({ chirp }: ChirpCardProps) {
	return (
		<div className="card flex-column chirp-card">
			<div className="chirp-card__content">{chirp.content}</div>
			<div className="chirp-card__meta">
				{chirp.author?.name || "me"} &bull; {format(chirp.createdAt)}
			</div>
		</div>
	);
}

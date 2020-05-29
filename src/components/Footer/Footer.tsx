import React from "react";
import "./Footer.css";

export default function Footer() {
	return (
		<div className="chipper__footer">
			Made with{" "}
			<span role="img" aria-label="love">
				❤️
			</span>{" "}
			by{" "}
			<a
				className="chipper__footer__link"
				rel="noopener noreferrer"
				target="_blank"
				href="https://www.github.com/petgoldfish"
			>
				Raghav Sai
			</a>{" "}
		</div>
	);
}

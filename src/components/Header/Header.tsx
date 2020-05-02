import "./Header.css";

import React from "react";

export default function Header() {
	return (
		<div className="chipper__header">
			<h1 className="chipper__header__title">chipper</h1>
			<button className="chipper__header__login button card">login</button>
		</div>
	);
}

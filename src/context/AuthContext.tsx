import { navigate } from "@reach/router";
import React, { createContext, useState } from "react";
import { setAuthToken } from "../authToken";

interface AuthContextType {
	authenticated: boolean;
	login: Function;
	logout: Function;
}

export const AuthContext = createContext<AuthContextType>({
	authenticated: false,
	login: () => {},
	logout: () => {},
});

const AuthContextProvider: React.FC = ({ children }) => {
	const [authenticated, setAuthenticated] = useState(false);

	function login(token: string | null | undefined) {
		setAuthToken(token);
		setAuthenticated(true);
	}

	function logout() {
		setAuthToken(null);
		setAuthenticated(false);
		navigate("/");
	}

	return (
		<AuthContext.Provider value={{ authenticated, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContextProvider;

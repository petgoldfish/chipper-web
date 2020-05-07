import React, { createContext, useState } from "react";

interface AuthContextType {
	authenticated: boolean;
	setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextType>({
	authenticated: false,
	setAuthenticated: () => {},
});

const AuthContextProvider: React.FC = ({ children }) => {
	const [authenticated, setAuthenticated] = useState(false);

	return (
		<AuthContext.Provider value={{ authenticated, setAuthenticated }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContextProvider;

let authToken: string | undefined = "";

export function getAuthToken() {
	return authToken;
}

export function setAuthToken(token?: string) {
	authToken = token;
}

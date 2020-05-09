let authToken: string | null | undefined = "";

export function getAuthToken() {
	return authToken;
}

export function setAuthToken(token: string | null | undefined) {
	authToken = token;
}

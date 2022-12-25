import { isExpired } from "react-jwt";
export const isAuthenticated = (access_token) => {
	return !isExpired(access_token);
};

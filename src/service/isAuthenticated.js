import { isExpired } from "react-jwt";
export const isAuthenticated = () => {
	const access_token = localStorage.getItem("access_token");
	return !isExpired(access_token);
};

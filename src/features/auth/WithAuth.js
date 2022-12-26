import { useEffect } from "react";
import { selectSignInUser } from "../signIn/SignInSlice";
import { useSelector } from "react-redux";
import { isAuthenticated } from "../../service/isAuthenticated";
import { useLocation, useNavigate } from "react-router-dom";

const withAuth = (Component) => {
	return function AuthenticatedComponent(props) {
		const access_token = localStorage.getItem("access_token");
		const location = useLocation();
		const navigate = useNavigate();

		useEffect(() => {
			if (!access_token || !isAuthenticated(access_token)) {
				if (location.pathname !== "/") navigate("/");
			}
		}, [access_token, location.pathname, navigate]);

		if (!isAuthenticated) {
			return null;
		}

		return <Component {...props} />;
	};
};
export default withAuth;

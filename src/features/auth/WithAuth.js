import { useEffect } from "react";
import { selectSignInUser } from "../signIn/SignInSlice";
import { useSelector } from "react-redux";
import { isAuthenticated } from "../../service/isAuthenticated";
import { useLocation, useNavigate } from "react-router-dom";

const withAuth = (Component) => {
	return function AuthenticatedComponent(props) {
		const user = useSelector(selectSignInUser);
		const location = useLocation();
		const navigate = useNavigate();

		useEffect(() => {
			if (!user || !isAuthenticated(user.access_token)) {
				if (location.pathname !== "/") navigate("/");
			}
		}, [user, location.pathname, navigate]);

		if (!isAuthenticated) {
			return null;
		}

		return <Component {...props} />;
	};
};
export default withAuth;

import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import withAuth from "../auth/WithAuth";
import { selectSignInUser } from "../signIn/SignInSlice";

const Profile = () => {
	const user = useSelector(selectSignInUser);
	const dispatch = useDispatch();

	useEffect(() => {
		console.log(user);
	}, [user]);
	return <></>;
};

export default memo(withAuth(Profile));

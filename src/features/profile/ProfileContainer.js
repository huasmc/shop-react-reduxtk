import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import withAuth from "../auth/WithAuth";
import { selectSignInUser } from "../signIn/SignInSlice";
import { getUserOrders } from "./ProfileSlice";

const Profile = () => {
	const user = useSelector(selectSignInUser);
	const dispatch = useDispatch();

	useEffect(() => {
		if (user) dispatch(getUserOrders, { user_id: user.id });
	}, [user, dispatch]);
	return <></>;
};

export default memo(withAuth(Profile));

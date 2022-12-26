import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import withAuth from "../auth/WithAuth";
import { selectSignInUser } from "../signIn/SignInSlice";
import { getUserOrders, selectUserOrders } from "./ProfileSlice";
import OrdersTableComponent from "./components/OrdersTableComponent";

const Profile = () => {
	const orders = useSelector(selectUserOrders);
	const { user } = useSelector(selectSignInUser);
	const dispatch = useDispatch();

	useEffect(() => {
		if (user) {
			dispatch(getUserOrders({ user_id: user._id }));
		}
	}, [user, dispatch]);

	return (
		<>
			<OrdersTableComponent orders={orders} />
		</>
	);
};

export default memo(withAuth(Profile));

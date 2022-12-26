import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import withAuth from "../auth/WithAuth";
import { selectSignInUser } from "../signIn/SignInSlice";
import { getUserOrders, selectUserOrders } from "./ProfileSlice";
import OrdersTableComponent from "./components/OrdersTableComponent";
import { Box, Grid } from "@mui/material";
import RoleSelector from "../roleSelector/RoleSelector";

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
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					height: "100vh",
				}}
			>
				<Grid container spacing={2}>
					<Grid item row={1} xs={12}>
						<RoleSelector />
					</Grid>
					<Grid item row={1} xs={12}>
						<OrdersTableComponent orders={orders} />
					</Grid>
				</Grid>
			</Box>
		</>
	);
};

export default memo(withAuth(Profile));

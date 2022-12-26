import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import withAuth from "../auth/WithAuth";
import { selectSignInUser } from "../signIn/SignInSlice";
import { getUserOrders, selectUserOrders } from "./ProfileSlice";
import OrdersTableComponent from "./components/OrdersTableComponent";
import { Box, Grid } from "@mui/material";
import RoleSelector from "../roleSelector/RoleSelector";

const Profile = () => {
	const { user } = useSelector(selectSignInUser);
	const [skipOrders, setSkipOrders] = useState(0);
	const [limit, setLimit] = useState(5);
	const orders = useSelector(selectUserOrders);
	const dispatch = useDispatch();

	useEffect(() => {
		if (user) {
			dispatch(
				getUserOrders({
					user_id: user._id,
					skipOrders,
					limit,
				})
			);
		}
	}, [user, skipOrders, limit, dispatch]);

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
						<OrdersTableComponent
							ordersObject={orders}
							limit={limit}
							setSkipOrders={setSkipOrders}
						/>
					</Grid>
				</Grid>
			</Box>
		</>
	);
};

export default memo(withAuth(Profile));

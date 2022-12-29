import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import withAuth from "../auth/WithAuth";
import {
	getUserOrders,
	selectSignInUser,
	selectUserOrders,
} from "../signIn/SignInSlice";
import OrdersTableComponent from "./components/OrdersTableComponent";
import { Box, Grid } from "@mui/material";
import RoleSelector from "../roleSelector/RoleSelector";
import { setAppLoading } from "../../AppSlice";
import useIsMobile from "../../customHooks/useIsMobile";

const ProfileContainer = () => {
	const { user } = useSelector(selectSignInUser);
	const [skipOrders, setSkipOrders] = useState(0);
	const orders = useSelector(selectUserOrders);
	const isMobile = useIsMobile();
	const dispatch = useDispatch();

	const limit = 5;

	useEffect(() => {
		dispatch(setAppLoading(true));
		const body = {
			user_id: user._id,
			skipOrders,
			limit,
		};
		if (user) {
			dispatch(getUserOrders(body, dispatch));
		}
	}, [user, skipOrders, limit, dispatch]);

	return (
		<>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					height: "100vh",
					width: "100vw",
					padding: isMobile ? "" : "20%",
				}}
			>
				<Grid container spacing={1}>
					<Grid item row={1} xs={12}>
						<RoleSelector />
					</Grid>
					<Grid item row={2} xs={12}>
						{orders && (
							<OrdersTableComponent
								ordersObject={orders}
								skipOrders={skipOrders}
								limit={limit}
								setSkipOrders={setSkipOrders}
							/>
						)}
					</Grid>
				</Grid>
			</Box>
		</>
	);
};

export default memo(withAuth(ProfileContainer));

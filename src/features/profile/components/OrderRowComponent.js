import { memo, useCallback, useEffect, useState } from "react";
import { TableRow, TableCell, TextField, Tooltip } from "@mui/material";
import { UI_STRINGS } from "../../assets/UI_STRINGS";
import { get } from "../../../service/rest";
import { ENDPOINTS } from "../../../service/constants";
import { useDispatch, useSelector } from "react-redux";
import {
	selectSignInActiveRole,
	selectSignInUser,
} from "../../signIn/SignInSlice";
import { ROLES } from "../../assets/roles";
import AppButton from "../../common/AppButton";
import {
	deleteOrderAsyncThunk,
	updateOrderAsyncThunk,
} from "../thunks/ProfileAsyncThunks";
import { setAppLoading, setSnackbarMessage } from "../../../AppSlice";
import useIsMobile from "../../../customHooks/useIsMobile";

const OrderRowComponent = ({ order, skipOrders, limit }) => {
	const { user } = useSelector(selectSignInUser);
	const activeRole = useSelector(selectSignInActiveRole);
	const [product, setProduct] = useState();
	const isMobile = useIsMobile();
	const dispatch = useDispatch();

	const handleDeleteOrder = useCallback(() => {
		const body = {
			order_id: order._id,
			user,
			skipOrders,
			limit,
		};
		if (order._id) dispatch(deleteOrderAsyncThunk(body));
	}, [order, user, skipOrders, limit, dispatch]);

	const handleUpdateQuantity = useCallback(
		(event) => {
			const body = {
				_id: order._id,
				quantity: event.target.value,
				user,
				skipOrders,
				limit,
			};
			try {
				dispatch(updateOrderAsyncThunk(body, dispatch));
			} catch (error) {
				dispatch(setSnackbarMessage(UI_STRINGS.REQUEST_STATUS.REJECTED));
			}
		},
		[order, limit, skipOrders, user, dispatch]
	);

	const getProduct = useCallback(async () => {
		try {
			dispatch(setAppLoading(true));
			const request = await get(
				ENDPOINTS.SHOP_PRODUCTS + `/${order.product_id}`
			);
			const requestedProduct = request.json();
			requestedProduct.then((item) => {
				setProduct(item);
				dispatch(setAppLoading(false));
			});
		} catch (error) {
			dispatch(setAppLoading(false));
			dispatch(setSnackbarMessage(UI_STRINGS.EXTERNAL_MOCK_FAILED));
		}
	}, [order, dispatch]);

	useEffect(() => {
		getProduct();
	}, [getProduct]);

	return (
		<>
			{product && order && (
				<TableRow>
					<TableCell align="left">
						<div style={{ height: "75px", width: "75px" }}>
							<img
								src={product.thumbnail}
								alt=""
								style={{ maxWidth: "100%", maxHeight: "100%" }}
							/>
						</div>
					</TableCell>

					{!isMobile && (
						<TableCell align="left">{<h3>{product.title}</h3>}</TableCell>
					)}
					<TableCell align="left">
						<Tooltip
							title={
								activeRole !== ROLES[0] ? UI_STRINGS.ADMIN_ROLE_REQUIRED : ""
							}
						>
							<TextField
								type="number"
								onChange={handleUpdateQuantity}
								placeholder="Qty"
								style={{ width: "70px" }}
								disabled={activeRole !== ROLES[0]}
								value={order.quantity}
							/>
						</Tooltip>
					</TableCell>
					<TableCell align="left">
						{
							<p style={{ fontWeight: "bold" }}>
								${product.price.toLocaleString()}
							</p>
						}
					</TableCell>
					<TableCell>
						<AppButton
							text={UI_STRINGS.DELETE}
							handleClick={handleDeleteOrder}
							disabled={activeRole !== ROLES[0]}
							tooltip={UI_STRINGS.ADMIN_ROLE_REQUIRED}
						/>
					</TableCell>
				</TableRow>
			)}
		</>
	);
};

export default memo(OrderRowComponent);

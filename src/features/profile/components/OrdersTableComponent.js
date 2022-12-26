import { memo, useCallback, useEffect, useState } from "react";
import withAuth from "../../auth/WithAuth";
import {
	TableContainer,
	Paper,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Pagination,
	TextField,
	Grid,
	Tooltip,
} from "@mui/material";
import { UI_STRINGS } from "../../assets/UI_STRINGS";
import { get } from "../../../service/rest";
import { ENDPOINTS } from "../../../service/constants";
import { useDispatch, useSelector } from "react-redux";
import { selectSignInUser } from "../../signIn/SignInSlice";
import { ROLES } from "../../assets/roles";
import AppButton from "../../common/AppButton";
import {
	deleteOrderAsyncThunk,
	updateOrderAsyncThunk,
} from "../thunks/ProfileAsyncThunks";
import { setAppLoading, setSnackbarMessage } from "../../../AppSlice";

const OrderRowComponent = ({ order, skipOrders, limit }) => {
	const { user } = useSelector(selectSignInUser);
	const [product, setProduct] = useState();
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

	const handleUpdateQuantity = useCallback((event) => {
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
	}, []);

	const getProduct = useCallback(async () => {
		const request = await get(ENDPOINTS.SHOP_PRODUCTS + `/${order.product_id}`);
		const requestedProduct = request.json();
		requestedProduct.then((item) => {
			setProduct(item);
			dispatch(setAppLoading(false));
		});
	}, [order, dispatch]);

	useEffect(() => {
		getProduct();
	}, [getProduct]);

	return (
		<>
			{product && order && (
				<TableRow>
					<TableCell align="left">
						<img src={product.thumbnail} alt="" style={{ width: "140px" }} />
					</TableCell>

					<TableCell align="left">{<h3>{product.title}</h3>}</TableCell>
					<TableCell align="left">
						<Tooltip
							title={
								user.activeRole === ROLES[1]
									? UI_STRINGS.ADMIN_ROLE_REQUIRED
									: ""
							}
						>
							<TextField
								type="number"
								onChange={handleUpdateQuantity}
								placeholder="Qty"
								style={{ width: "70px" }}
								disabled={user.activeRole === ROLES[1]}
								defaultValue={order.quantity}
							/>
						</Tooltip>
					</TableCell>
					<TableCell align="left">{<h3>${product.price}</h3>}</TableCell>
					<TableCell>
						<AppButton
							text={UI_STRINGS.DELETE}
							handleClick={handleDeleteOrder}
							disabled={user.activeRole === ROLES[1]}
							tooltip={UI_STRINGS.ADMIN_ROLE_REQUIRED}
						/>
					</TableCell>
				</TableRow>
			)}
		</>
	);
};

const TableHeaders = ["", "Title", "Quantity", "Price"];

const OrdersTableComponent = ({
	ordersObject,
	skipOrders,
	limit,
	setSkipOrders,
}) => {
	const [page, setPage] = useState(1);
	const { orders } = ordersObject;

	const handlePageChange = useCallback(
		(event, newPage) => {
			setSkipOrders(newPage * 5 - 5);
			setPage(newPage);
		},
		[setPage, setSkipOrders]
	);

	const getPageCount = () => {
		const count = ordersObject.count / limit;
		const roundCount = Math.round(count);
		return !isNaN(roundCount) ? roundCount : 5;
	};
	return (
		<>
			<Grid>
				<TableContainer component={Paper}>
					<Table>
						<TableHead>
							<TableRow>
								{TableHeaders.map((header) => (
									<TableCell key={header}>{header}</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{orders && orders.length > 0 ? (
								orders.map((order) => (
									<OrderRowComponent
										key={order._id}
										order={order}
										skipOrders={skipOrders}
										limit={limit}
									/>
								))
							) : (
								<TableRow>
									<TableCell align="left">{UI_STRINGS.YOUR_ORDERS}</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
				<Pagination
					count={getPageCount()}
					onChange={handlePageChange}
					page={page}
				/>
			</Grid>
		</>
	);
};

export default memo(withAuth(OrdersTableComponent));

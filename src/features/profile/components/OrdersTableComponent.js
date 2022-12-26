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
} from "@mui/material";
import { UI_STRINGS } from "../../assets/UI_STRINGS";
import { get } from "../../../service/rest";
import { ENDPOINTS } from "../../../service/constants";
import { useDispatch, useSelector } from "react-redux";
import { selectSignInUser } from "../../signIn/SignInSlice";
import { ROLES } from "../../assets/roles";
import AppButton from "../../common/AppButton";
import { updateOrderAsyncThunk } from "../thunks/ProfileAsyncThunks";
import { setAppLoading, setSnackbarMessage } from "../../../AppSlice";

const OrderRowComponent = ({ order, skipOrders, limit }) => {
	const { user } = useSelector(selectSignInUser);
	const [product, setProduct] = useState();
	const dispatch = useDispatch();

	const handleDeleteOrder = useCallback(() => {}, []);

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

	const getProduct = useCallback(
		async (event) => {
			const request = await get(
				ENDPOINTS.SHOP_PRODUCTS + `/${order.product_id}`
			);
			const requestedProduct = request.json();
			requestedProduct.then((item) => {
				setProduct(item);
				dispatch(setAppLoading(false));
			});
		},
		[order, dispatch]
	);

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
						<TextField
							type="number"
							onChange={handleUpdateQuantity}
							placeholder="Qty"
							style={{ width: "70px" }}
							defaultValue={order.quantity}
						/>
					</TableCell>
					<TableCell align="left">{<h3>${product.price}</h3>}</TableCell>
					<TableCell>
						<AppButton
							text={UI_STRINGS.DELETE}
							handleClick={handleDeleteOrder}
							disabled={user.activeRole === ROLES[1]}
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
							{orders &&
								orders.length > 0 &&
								orders.map((order) => (
									<OrderRowComponent
										key={order._id}
										order={order}
										skipOrders={skipOrders}
										limit={limit}
									/>
								))}
						</TableBody>
					</Table>
				</TableContainer>
				<Pagination
					count={Math.round(ordersObject.count / limit)}
					onChange={handlePageChange}
					page={page}
				/>
			</Grid>
		</>
	);
};

export default memo(withAuth(OrdersTableComponent));

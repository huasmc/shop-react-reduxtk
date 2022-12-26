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
import { useSelector } from "react-redux";
import { selectSignInUser } from "../../signIn/SignInSlice";
import { ROLES } from "../../assets/roles";
import AppButton from "../../common/AppButton";

const OrderRowComponent = ({ order }) => {
	const { user } = useSelector(selectSignInUser);
	const [product, setProduct] = useState();

	const handleDeleteOrder = useCallback(() => {}, []);
	const handleUpdateQuantity = useCallback(() => {}, []);

	const getProduct = useCallback(async () => {
		const request = await get(ENDPOINTS.SHOP_PRODUCTS + `/${order.product_id}`);
		const requestedProduct = await request.json();
		setProduct(requestedProduct);
	}, [order]);

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

const OrdersTableComponent = ({ ordersObject, limit, setSkipOrders }) => {
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
							{orders.length > 0 &&
								orders.map((order) => (
									<OrderRowComponent key={order._id} order={order} />
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

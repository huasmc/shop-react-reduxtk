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
	Button,
	TextField,
	Grid,
} from "@mui/material";
import { UI_STRINGS } from "../../assets/UI_STRINGS";
import { get } from "../../../service/rest";
import { ENDPOINTS } from "../../../service/constants";

const OrderRowComponent = ({ order }) => {
	const [product, setProduct] = useState();

	const handleDeleteOrder = useCallback(() => {}, []);
	const handleUpdateQuantity = useCallback(() => {}, []);

	const getProduct = useCallback(async () => {
		const request = await get(ENDPOINTS.SHOP_PRODUCTS + `/${order.product_id}`);
		const requestedProduct = await request.json();
		console.log(requestedProduct);
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
						<Button
							onClick={handleDeleteOrder}
							variant="contained"
							style={{ backgroundColor: "darkred" }}
						>
							{UI_STRINGS.DELETE}
						</Button>
					</TableCell>
				</TableRow>
			)}
		</>
	);
};

const TableHeaders = ["", "Title", "Quantity", "Price"];

const OrdersTableComponent = ({ orders }) => {
	const [page, setPage] = useState(1);

	const handlePageChange = useCallback(
		(event, newPage) => {
			setPage(newPage);
		},
		[setPage]
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
								[orders[1]].map((order) => (
									<OrderRowComponent key={order._id} order={order} />
								))}
						</TableBody>
					</Table>
				</TableContainer>
				<Pagination
					count={orders.length}
					onChange={handlePageChange}
					page={page}
				/>
			</Grid>
		</>
	);
};

export default memo(withAuth(OrdersTableComponent));

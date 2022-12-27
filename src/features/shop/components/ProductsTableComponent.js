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
import { memo, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UI_STRINGS } from "../../assets/UI_STRINGS";
import { createOrderAsyncThunk, selectProducts } from "../ShopSlice";
import { selectSignInUser } from "../../signIn/SignInSlice";
import AppButton from "../../common/AppButton";
import { ROLES } from "../../assets/roles";

const TableHeaders = ["", "Title", "Quantity", "Price"];

const ProductRowComponent = ({ product }) => {
	const { user } = useSelector(selectSignInUser);
	const [quantity, setQuantity] = useState(1);
	const dispatch = useDispatch();

	const handleCreateOrder = useCallback(() => {
		if (product && quantity && user.activeRole !== ROLES[0]) {
			const body = { product_id: product.id, quantity, user_id: user._id };
			dispatch(createOrderAsyncThunk(body, dispatch));
		}
	}, [product, quantity, user, dispatch]);
	return (
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

			<TableCell align="left">
				<h3>{product.title}</h3>
			</TableCell>
			<TableCell align="left">
				<TextField
					type="number"
					onChange={(event) => setQuantity(event.target.value)}
					placeholder="Qty"
					style={{ width: "70px" }}
					defaultValue={quantity}
				/>
			</TableCell>
			<TableCell align="left">
				<h3>${product.price.toLocaleString()}</h3>
			</TableCell>
			<TableCell>
				<AppButton
					text={UI_STRINGS.BUY}
					handleClick={handleCreateOrder}
					disabled={user.activeRole !== ROLES[1]}
					tooltip={UI_STRINGS.USER_ROLE_REQUIRED}
				/>
			</TableCell>
		</TableRow>
	);
};

const ProductsTableComponent = ({ products, setSkipProducts }) => {
	const [page, setPage] = useState(1);

	const handlePageChange = useCallback(
		(event, newPage) => {
			setSkipProducts(newPage * 5 - 5);
			setPage(newPage);
		},
		[setPage, setSkipProducts]
	);

	return (
		<Grid>
			<TableContainer component={Paper} style={{ overflow: "hidden" }}>
				<Table>
					<TableHead>
						<TableRow>
							{TableHeaders.map((header) => (
								<TableCell key={header}>{header}</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{products &&
							products.map((product) => (
								<ProductRowComponent key={product.id} product={product} />
							))}
					</TableBody>
				</Table>
				<Pagination
					count={products.length}
					onChange={handlePageChange}
					page={page}
				/>
			</TableContainer>
		</Grid>
	);
};

export default memo(ProductsTableComponent);

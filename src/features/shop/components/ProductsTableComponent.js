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
} from "@mui/material";
import { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UI_STRINGS } from "../../assets/UI_STRINGS";
import { createOrderAsyncThunk, selectProducts } from "../ShopSlice";
import { Grid } from "@mui/material";
import { selectSignInUser } from "../../signIn/SignInSlice";

const TableHeaders = ["", "Title", "Quantity", "Price"];

const ProductRowComponent = ({ product }) => {
	const { user } = useSelector(selectSignInUser);
	const [quantity, setQuantity] = useState(1);
	const dispatch = useDispatch();

	const handleCreateOrder = (product) => {
		if (product && quantity) {
			const body = { product_id: product.id, quantity, user_id: user._id };
			dispatch(createOrderAsyncThunk(body));
		}
	};
	return (
		<TableRow>
			<TableCell align="left">
				<img src={product.thumbnail} alt="" style={{ width: "140px" }} />
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
				<Button onClick={() => handleCreateOrder(product)} variant="contained">
					{UI_STRINGS.BUY}
				</Button>
			</TableCell>
		</TableRow>
	);
};

const ProductsTableComponent = ({ setSkipProducts, purchase }) => {
	const products = useSelector(selectProducts);
	const [page, setPage] = useState(1);

	const handlePageChange = (event, newPage) => {
		setSkipProducts(newPage * 5 - 5);
		setPage(newPage);
	};

	return (
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
						{products &&
							products.map((product) => (
								<ProductRowComponent key={product.id} product={product} />
							))}
					</TableBody>
				</Table>
			</TableContainer>
			<Pagination
				count={products.length}
				onChange={handlePageChange}
				page={page}
			/>
		</Grid>
	);
};

export default memo(ProductsTableComponent);

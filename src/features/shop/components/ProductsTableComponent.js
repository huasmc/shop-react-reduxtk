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
} from "@mui/material";
import { memo, useState } from "react";
import { useSelector } from "react-redux";
import { UI_STRINGS } from "../../assets/UI_STRINGS";
import { selectProducts } from "../ShopSlice";
import { Grid } from "@mui/material";

const TableHeaders = ["", "Title", "Price"];

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
								<TableRow key={product.id}>
									<TableCell align="left">
										<img
											src={product.thumbnail}
											alt=""
											style={{ width: "140px" }}
										/>
									</TableCell>

									<TableCell align="left">
										<h3>{product.title}</h3>
									</TableCell>
									<TableCell align="left">
										<h3>${product.price}</h3>
									</TableCell>
									<TableCell>
										<Button
											onClick={() => purchase(product)}
											variant="contained"
										>
											{UI_STRINGS.BUY}
										</Button>
									</TableCell>
								</TableRow>
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

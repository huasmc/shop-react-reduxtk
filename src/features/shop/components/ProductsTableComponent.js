import {
	TableContainer,
	Paper,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Pagination,
} from "@mui/material";
import { memo, useCallback, useState } from "react";
import ProductRowComponent from "./ProductRowComponent";

const TableHeaders = ["", "Title", "Quantity", "Price"];

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
						products.length > 0 &&
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
	);
};

export default memo(ProductsTableComponent);

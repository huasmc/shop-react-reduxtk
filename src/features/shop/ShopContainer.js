import { memo, useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ProductsTableComponent from "./components/ProductsTableComponent";
import { getProductsAsyncThunk } from "./ShopSlice";
import { Box } from "@mui/material";
import withAuth from "../auth/WithAuth";

const ShopContainer = () => {
	const [skipProducts, setSkipProducts] = useState(0);
	const dispatch = useDispatch();

	useEffect(() => {
		const queryParams = { limit: 5, skip: skipProducts };
		dispatch(getProductsAsyncThunk(queryParams));
	}, [skipProducts, dispatch]);

	const purchase = useCallback(() => {}, []);

	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				height: "100vh",
			}}
		>
			<ProductsTableComponent
				setSkipProducts={setSkipProducts}
				purchase={purchase}
			/>
		</Box>
	);
};

export default memo(withAuth(ShopContainer));

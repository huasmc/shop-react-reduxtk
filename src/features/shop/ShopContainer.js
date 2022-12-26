import { memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ProductsTableComponent from "./components/ProductsTableComponent";
import { getProductsAsyncThunk } from "./ShopSlice";
import { Box } from "@mui/material";
import withAuth from "../auth/WithAuth";
import { setAppLoading } from "../../AppSlice";

const ShopContainer = () => {
	const [skipProducts, setSkipProducts] = useState(0);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setAppLoading(true));
		const queryParams = { limit: 5, skip: skipProducts };
		dispatch(getProductsAsyncThunk(queryParams, dispatch));
	}, [skipProducts, dispatch]);

	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				height: "100vh",
			}}
		>
			<ProductsTableComponent setSkipProducts={setSkipProducts} />
		</Box>
	);
};

export default memo(withAuth(ShopContainer));

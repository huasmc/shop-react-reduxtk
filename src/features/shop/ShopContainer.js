import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductsTableComponent from "./components/ProductsTableComponent";
import { getProductsAsyncThunk, selectProducts } from "./ShopSlice";
import { Box, Grid } from "@mui/material";
import withAuth from "../auth/WithAuth";
import { setAppLoading } from "../../AppSlice";
import { selectSignInUser } from "../signIn/SignInSlice";
import { UI_STRINGS } from "../assets/UI_STRINGS";
import useIsMobile from "../../customHooks/useIsMobile";

const ShopContainer = () => {
	const [skipProducts, setSkipProducts] = useState(0);
	const { user } = useSelector(selectSignInUser);
	const products = useSelector(selectProducts);
	const isMobile = useIsMobile();
	const dispatch = useDispatch();

	useEffect(() => {
		try {
			dispatch(setAppLoading(true));
			const queryParams = { limit: 5, skip: skipProducts };
			dispatch(getProductsAsyncThunk(queryParams, dispatch));
		} catch (error) {
			dispatch(UI_STRINGS.REQUEST_STATUS.REJECTED);
		}
	}, [user, skipProducts, dispatch]);

	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				height: "100vh",
				width: "100vw",
				padding: isMobile ? "" : "20%",
			}}
		>
			<Grid container>
				<Grid item column="true" xs={12}>
					<ProductsTableComponent
						products={products}
						setSkipProducts={setSkipProducts}
					/>
				</Grid>
			</Grid>
		</Box>
	);
};

export default memo(withAuth(ShopContainer));

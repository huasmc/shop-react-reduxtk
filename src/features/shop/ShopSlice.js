import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setAppLoading, setSnackbarMessage } from "../../AppSlice";
import { ENDPOINTS } from "../../service/constants";
import { get, post } from "../../service/rest";
import { UI_STRINGS } from "../assets/UI_STRINGS";

export const getProductsAsyncThunk = createAsyncThunk(
	"shop/products",
	async (queryParams, { dispatch }) => {
		try {
			const response = await get(ENDPOINTS.SHOP_PRODUCTS + "?", queryParams);
			const data = await response.json();
			dispatch(setAppLoading(false));
			return data;
		} catch (error) {
			throw new Error();
		}
	}
);

export const createOrderAsyncThunk = createAsyncThunk(
	"shop/buy",
	async (body, { dispatch }) => {
		const response = await post(ENDPOINTS.ADD_ORDER, body);
		const data = await response.json();
		dispatch(setSnackbarMessage(UI_STRINGS.SUCCESS));
		return data;
	}
);

const shopSlice = createSlice({
	name: "shop",
	initialState: { loading: false, total: 0, products: [] },
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getProductsAsyncThunk.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(getProductsAsyncThunk.fulfilled, (state, action) => {
			state.loading = false;
			state.total = action.payload.total;
			state.products = action.payload.products;
		});
		builder.addCase(getProductsAsyncThunk.rejected, (state, action) => {
			state.loading = false;
		});
	},
});

export const selectProducts = (state) => state.shopReducer.products;
export default shopSlice.reducer;

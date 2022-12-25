import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ENDPOINTS } from "../../service/constants";
import { get } from "../../service/rest";

export const getProductsAsyncThunk = createAsyncThunk(
	"shop/products",
	async (queryParams) => {
		const response = await get(ENDPOINTS.SHOP_PRODUCTS, queryParams);
		const data = await response.json();
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

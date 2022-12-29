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
		try {
			const response = await post(ENDPOINTS.ADD_ORDER, body);
			dispatch(setAppLoading(false));
			const data = await response.json();
			if (data.quantity) {
				dispatch(setSnackbarMessage(UI_STRINGS.SUCCESS));
			}
			return data;
		} catch (error) {
			dispatch(setSnackbarMessage(UI_STRINGS.SERVER_RUNNING));
			dispatch(setAppLoading(false));
			throw new Error(error);
		}
	}
);

const shopSlice = createSlice({
	name: "shop",
	initialState: { total: 0, products: [] },
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getProductsAsyncThunk.fulfilled, (state, action) => {
			state.loading = false;
			state.total = action.payload.total;
			state.products = action.payload.products;
		});
	},
});

export const selectProducts = (state) => state.shopReducer.products;
export default shopSlice.reducer;

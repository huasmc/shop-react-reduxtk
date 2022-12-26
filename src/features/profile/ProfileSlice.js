import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ENDPOINTS } from "../../service/constants";
import { get, post } from "../../service/rest";

export const getUserOrders = createAsyncThunk(
	"profile/orders",
	async (body) => {
		const response = await get(ENDPOINTS.SHOP_PRODUCTS, body);
		const data = await response.json();
		console.log(data);
		return data;
	}
);

const profileSlice = createSlice({
	name: "profile",
	initialState: { orders: [], loading: false },
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getUserOrders.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(getUserOrders.fulfilled, (state, action) => {
			state.loading = false;
			state.total = action.payload.total;
			state.products = action.payload.products;
		});
		builder.addCase(getUserOrders.rejected, (state, action) => {
			state.loading = false;
		});
	},
});

export const selectUserOrders = (state) => state.profileReducer.orders;
export default profileSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ENDPOINTS } from "../../service/constants";
import { get } from "../../service/rest";

export const getUserOrders = createAsyncThunk(
	"profile/orders",
	async (body) => {
		const response = await get(ENDPOINTS.USER_ORDERS + "?", body);
		const data = await response.json();
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
			state.orders = action.payload;
		});
		builder.addCase(getUserOrders.rejected, (state, action) => {
			state.loading = false;
		});
	},
});

export const selectUserOrders = (state) => state.profileReducer.orders;
export default profileSlice.reducer;

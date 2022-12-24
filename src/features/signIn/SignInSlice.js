import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ENDPOINTS } from "../../service/constants";
import { post } from "../../service/rest";

export const signInAsyncThunk = createAsyncThunk("sign-in", async (body) => {
	const response = await post(ENDPOINTS.SIGN_IN, body);
	const data = await response.json();
	return data;
});

const signInSlice = createSlice({
	name: "signIn",
	initialState: { loading: false, success: null },
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(signInAsyncThunk.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(signInAsyncThunk.fulfilled, (state, action) => {
			state.loading = false;
			state.success = true;
		});
		builder.addCase(signInAsyncThunk.rejected, (state, action) => {
			state.success = false;
		});
	},
});

export const selectSignInLoading = (state) => state.signInReducer.loading;
export const selectSignInSuccess = (state) => state.signInReducer.success;
export default signInSlice.reducer;

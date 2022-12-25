import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ENDPOINTS } from "../../service/constants";
import { post } from "../../service/rest";
import { UI_STRINGS } from "../assets/UI_STRINGS";

export const signInAsyncThunk = createAsyncThunk("sign-in", async (body) => {
	const response = await post(ENDPOINTS.SIGN_IN, body);
	return await response.json();
});

export const signUpAsyncThunk = createAsyncThunk("sign-up", async (body) => {
	const response = await post(ENDPOINTS.SIGN_UP, body);
	return await response.json();
});

const signInSlice = createSlice({
	name: "signIn",
	initialState: { loading: false, success: null, user: null, message: "" },
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(signInAsyncThunk.pending, (state, action) => {
			state.loading = true;
			state.message = UI_STRINGS.LOADING;
		});
		builder.addCase(signInAsyncThunk.fulfilled, (state, action) => {
			state.loading = false;
			const { payload } = action;
			state.user = payload;
		});
		builder.addCase(signInAsyncThunk.rejected, (state, action) => {
			state.loading = false;
			state.success = false;
		});
		builder.addCase(signUpAsyncThunk.pending, (state, action) => {
			state.loading = true;
			state.message = UI_STRINGS.LOADING;
		});
		builder.addCase(signUpAsyncThunk.fulfilled, (state, action) => {
			state.loading = false;
			state.success = true;
			const { payload } = action;
			state.message = payload.message;
			state.user = payload;
		});
		builder.addCase(signUpAsyncThunk.rejected, (state, action) => {
			state.loading = false;
			console.log(action);
			state.success = false;
		});
	},
});

export const selectSignInLoading = (state) => state.signInReducer.loading;
export const selectSignInSuccess = (state) => state.signInReducer.success;
export const selectSignInUser = (state) => state.signInReducer.user;
export const selectSignInMessage = (state) => state.signInReducer.message;
export default signInSlice.reducer;

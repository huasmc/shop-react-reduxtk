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
	initialState: { loading: false, user: null, message: "" },
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(signInAsyncThunk.pending, (state, action) => {
			state.loading = true;
			state.message = UI_STRINGS.LOADING;
		});
		builder.addCase(signInAsyncThunk.fulfilled, (state, action) => {
			state.loading = false;
			const { payload } = action;
			if (payload.statusCode) state.message = payload.message;
			else if (payload.access_token && payload.user) {
				localStorage.setItem("access_token", payload.access_token);
				state.user = payload;
			}
		});
		builder.addCase(signInAsyncThunk.rejected, (state, action) => {
			state.loading = false;
		});
		builder.addCase(signUpAsyncThunk.pending, (state, action) => {
			state.loading = true;
			state.message = UI_STRINGS.LOADING;
		});
		builder.addCase(signUpAsyncThunk.fulfilled, (state, action) => {
			state.loading = false;
			const { payload } = action;
			state.message = payload.message;
			state.user = payload;
		});
		builder.addCase(signUpAsyncThunk.rejected, (state, action) => {
			state.loading = false;
		});
	},
});

export const selectSignInLoading = (state) => state.signInReducer.loading;
export const selectSignInUser = (state) => state.signInReducer.user;
export const selectSignInMessage = (state) => state.signInReducer.message;
export default signInSlice.reducer;

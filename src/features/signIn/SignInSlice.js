import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ENDPOINTS } from "../../service/constants";
import { post } from "../../service/rest";
import { ROLES } from "../assets/roles";
import { UI_STRINGS } from "../assets/UI_STRINGS";

export const signInAsyncThunk = createAsyncThunk("sign-in", async (body) => {
	const response = await post(ENDPOINTS.SIGN_IN, body);
	return await response.json();
});

export const signUpAsyncThunk = createAsyncThunk("sign-up", async (body) => {
	const response = await post(ENDPOINTS.SIGN_UP, body);
	return await response.json();
});

export const profileAsyncThunk = createAsyncThunk("profile", async (body) => {
	const response = await post(ENDPOINTS.PROFILE, body);
	return await response.json();
});

const signInSlice = createSlice({
	name: "signIn",
	initialState: { user: null, message: "" },
	reducers: {
		setSignInActiveRole: (state, action) => {
			state.user.activeRole = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(signInAsyncThunk.pending, (state, action) => {
			state.message = UI_STRINGS.REQUEST_STATUS.LOADING;
		});
		builder.addCase(signInAsyncThunk.fulfilled, (state, action) => {
			state.loading = false;
			const { payload } = action;
			if (payload.statusCode) state.message = payload.message;
			else if (payload.access_token && payload.user) {
				localStorage.setItem("access_token", payload.access_token);
				const { user } = payload;
				state.user = user;
				if (user && user.roles.includes(ROLES[0]))
					state.user.activeRole = ROLES[0];
				else state.user.activeRole = ROLES[1];
			}
		});
		builder.addCase(signInAsyncThunk.rejected, (state, action) => {});
		builder.addCase(signUpAsyncThunk.pending, (state, action) => {
			state.message = UI_STRINGS.REQUEST_STATUS.LOADING;
		});
		builder.addCase(signUpAsyncThunk.fulfilled, (state, action) => {
			const { payload } = action;
			state.message = payload.message;
			state.user = payload;
		});
		builder.addCase(signUpAsyncThunk.rejected, (state, action) => {});
	},
});

export const selectSignInLoading = (state) => state.signInReducer.loading;
export const selectSignInUser = (state) => state.signInReducer;
export const selectSignInMessage = (state) => state.signInReducer.message;
export const { setSignInActiveRole } = signInSlice.actions;
export default signInSlice.reducer;

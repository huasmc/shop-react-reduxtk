import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setAppLoading } from "../../AppSlice";
import { ENDPOINTS } from "../../service/constants";
import { get, post } from "../../service/rest";
import { ROLES } from "../assets/roles";
import { UI_STRINGS } from "../assets/UI_STRINGS";

export const signInAsyncThunk = createAsyncThunk(
	"sign-in",
	async (body, { dispatch }) => {
		try {
			const response = await post(ENDPOINTS.SIGN_IN, body);
			dispatch(setAppLoading(false));
			return await response.json();
		} catch (error) {
			dispatch(setAppLoading(false));
			throw new Error(error);
		}
	}
);

export const signUpAsyncThunk = createAsyncThunk("sign-up", async (body) => {
	const response = await post(ENDPOINTS.SIGN_UP, body);
	return await response.json();
});

export const profileAsyncThunk = createAsyncThunk(
	"profile",
	async (body, { dispatch }) => {
		try {
			const response = await post(ENDPOINTS.PROFILE, body);
			dispatch(setAppLoading(false));
			return await response.json();
		} catch (error) {
			dispatch(setAppLoading(false));
			throw new Error(error);
		}
	}
);

export const getUserOrders = createAsyncThunk(
	"profile/orders",
	async (queryParams, { dispatch }) => {
		try {
			const response = await get(ENDPOINTS.USER_ORDERS + "?", queryParams);
			dispatch(setAppLoading(false));
			const data = await response.json();
			return data;
		} catch (error) {
			dispatch(setAppLoading(false));
			throw new Error(error);
		}
	}
);

const signInSlice = createSlice({
	name: "signIn",
	initialState: { user: { user: {} }, message: "", orders: [] },
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
				state.message = UI_STRINGS.SUCCESS;
				localStorage.setItem("access_token", payload.access_token);
				const { user } = payload;
				state.user = { user };
				if (user && user.roles.includes(ROLES[0]))
					state.user.activeRole = ROLES[0];
				else state.user.activeRole = ROLES[1];
			}
		});
		builder.addCase(signInAsyncThunk.rejected, (state, action) => {
			state.loading = false;
			state.message = UI_STRINGS.NOT_AUTHORIZED;
		});
		builder.addCase(signUpAsyncThunk.pending, (state, action) => {
			state.message = UI_STRINGS.REQUEST_STATUS.LOADING;
		});
		builder.addCase(signUpAsyncThunk.fulfilled, (state, action) => {
			const { payload } = action;
			state.message = payload.message;
			state.user = payload;
		});
		builder.addCase(signUpAsyncThunk.rejected, (state, action) => {});
		builder.addCase(getUserOrders.pending, (state, action) => {
			state.loading = true;
			state.orders = [];
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

export const selectSignInUser = (state) => state.signInReducer.user;
export const selectSignInMessage = (state) => state.signInReducer.message;
export const selectUserOrders = (state) => state.signInReducer.orders;
export const selectSignInActiveRole = (state) =>
	state.signInReducer.user.activeRole;

export const { setSignInActiveRole } = signInSlice.actions;
export default signInSlice.reducer;

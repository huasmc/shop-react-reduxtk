import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
	name: "app",
	initialState: { snackbarMessage: [], loading: false },
	reducers: {
		setSnackbarMessage: (state, action) => {
			const { payload } = action;
			state.snackbarMessage.push(payload);
		},
		setAppLoading: (state, action) => {
			const { payload } = action;
			state.loading = payload;
		},
	},
});

export const selectSnackbarMessage = (state) =>
	state.appReducer.snackbarMessage;

export const selectAppLoading = (state) => state.appReducer.loading;
export const { setSnackbarMessage, setAppLoading } = appSlice.actions;
export default appSlice.reducer;

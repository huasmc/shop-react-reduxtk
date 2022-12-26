import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
	name: "app",
	initialState: { snackbarMessage: [] },
	reducers: {
		setSnackbarMessage: (state, action) => {
			const { payload } = action;
			state.snackbarMessage.push(payload);
		},
	},
});

export const selectSnackbarMessage = (state) =>
	state.appReducer.snackbarMessage;

export const { setSnackbarMessage } = appSlice.actions;
export default appSlice.reducer;

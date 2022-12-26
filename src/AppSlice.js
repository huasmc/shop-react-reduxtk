import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
	name: "app",
	initialState: { snackbarMessage: "" },
	reducers: {
		setSnackbarMessage: (state, action) => {
			state.snackbarMessage = action.payload;
		},
	},
});

export const selectSnackbarMessage = (state) =>
	state.appReducer.snackbarMessage;

export const { setSnackbarMessage } = appSlice.actions;
export default appSlice.reducer;

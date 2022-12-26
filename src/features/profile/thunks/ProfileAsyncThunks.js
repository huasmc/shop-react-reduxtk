import { createAsyncThunk } from "@reduxjs/toolkit";
import { setSnackbarMessage } from "../../../AppSlice";
import { ENDPOINTS } from "../../../service/constants";
import { put } from "../../../service/rest";
import { UI_STRINGS } from "../../assets/UI_STRINGS";

export const updateOrderAsyncThunk = createAsyncThunk(
	"profile/update-order",
	async (body, { dispatch }) => {
		try {
			const response = await put(ENDPOINTS.UPDATE_ORDER, body);
			const jsonResponse = await response.json();
			if (jsonResponse.quantity)
				dispatch(setSnackbarMessage(UI_STRINGS.SUCCESS));
			return await jsonResponse;
		} catch (error) {
			dispatch(setSnackbarMessage(error));
		}
	}
);

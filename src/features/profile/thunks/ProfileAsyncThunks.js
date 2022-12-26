import { createAsyncThunk } from "@reduxjs/toolkit";
import { setSnackbarMessage } from "../../../AppSlice";
import { ENDPOINTS } from "../../../service/constants";
import { put } from "../../../service/rest";
import { UI_STRINGS } from "../../assets/UI_STRINGS";
import { getUserOrders } from "../../signIn/SignInSlice";

export const updateOrderAsyncThunk = createAsyncThunk(
	"profile/update-order",
	async (params, { dispatch }) => {
		try {
			const response = await put(ENDPOINTS.UPDATE_ORDER, {
				_id: params._id,
				quantity: params.quantity,
			});
			const jsonResponse = await response.json();
			if (jsonResponse.quantity) {
				dispatch(setSnackbarMessage(UI_STRINGS.SUCCESS));
				const queryParams = {
					user_id: params.user._id,
					skipOrders: params.skipOrders,
					limit: params.limit,
				};
				dispatch(getUserOrders(queryParams));
			}
			return await jsonResponse;
		} catch (error) {
			dispatch(setSnackbarMessage(error));
		}
	}
);

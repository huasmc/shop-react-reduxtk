import { createAsyncThunk } from "@reduxjs/toolkit";
import { setSnackbarMessage } from "../../../AppSlice";
import { ENDPOINTS } from "../../../service/constants";
import { put, remove } from "../../../service/rest";
import { UI_STRINGS } from "../../assets/UI_STRINGS";
import { getUserOrders } from "../../signIn/SignInSlice";

export const updateOrderAsyncThunk = createAsyncThunk(
	"profile/update-order",
	async (body, { dispatch }) => {
		try {
			const response = await put(ENDPOINTS.UPDATE_ORDER, {
				_id: body._id,
				quantity: body.quantity,
			});
			const jsonResponse = await response.json();
			if (jsonResponse.quantity) {
				dispatch(setSnackbarMessage(UI_STRINGS.SUCCESS));
				const querybody = {
					user_id: body.user._id,
					skipOrders: body.skipOrders,
					limit: body.limit,
				};
				dispatch(getUserOrders(querybody));
			}
			return await jsonResponse;
		} catch (error) {
			throw new Error(error);
		}
	}
);

export const deleteOrderAsyncThunk = createAsyncThunk(
	"profile/delete-order",
	async (body, { dispatch }) => {
		try {
			const response = await remove(ENDPOINTS.DELETE_ORDER, {
				order_id: body.order_id,
			});
			const jsonResponse = await response.json();
			if (jsonResponse.success) {
				dispatch(setSnackbarMessage(UI_STRINGS.SUCCESS));
				const querybody = {
					user_id: body.user._id,
					skipOrders: body.skipOrders,
					limit: body.limit,
				};
				dispatch(getUserOrders(querybody));
			}
		} catch (error) {}
	}
);

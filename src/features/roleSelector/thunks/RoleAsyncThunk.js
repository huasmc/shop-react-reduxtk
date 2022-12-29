import { createAsyncThunk } from "@reduxjs/toolkit";
import { ENDPOINTS } from "../../../service/constants";
import { put } from "../../../service/rest";
import { UI_STRINGS } from "../../assets/UI_STRINGS";
import { setSignInActiveRole } from "../../signIn/SignInSlice";
import { setSnackbarMessage } from "../../../AppSlice";

export const addRoleAsyncThunk = createAsyncThunk(
	"add-role",
	async (body, { dispatch }) => {
		try {
			const { user_id } = body;
			const response = await put(ENDPOINTS.ADD_ROLE, { user_id });
			const jsonResponse = await response.json();
			if (jsonResponse) {
				dispatch(setSignInActiveRole(body.activeRole));
				dispatch(
					setSnackbarMessage(
						`${UI_STRINGS.SUCCESS}: Your active role is ${body.activeRole}`
					)
				);
			}
			return await jsonResponse;
		} catch (error) {
			throw new Error(error);
		}
	}
);

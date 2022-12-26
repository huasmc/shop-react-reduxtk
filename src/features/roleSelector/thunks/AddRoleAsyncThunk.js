import { createAsyncThunk } from "@reduxjs/toolkit";
import { ENDPOINTS } from "../../../service/constants";
import { put } from "../../../service/rest";

export const addRoleAsyncThunk = createAsyncThunk("add-role", async (body) => {
	const response = await put(ENDPOINTS.ADD_ROLE, body);
	const jsonResponse = await response.json();
	return await jsonResponse;
});

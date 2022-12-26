import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSnackbarMessage } from "../../AppSlice";
import { ROLES } from "../assets/roles";
import { UI_STRINGS } from "../assets/UI_STRINGS";
import { selectSignInUser, setSignInActiveRole } from "../signIn/SignInSlice";
import { addRoleAsyncThunk } from "./thunks/AddRoleAsyncThunk";

const RoleSelector = () => {
	const { user } = useSelector(selectSignInUser);
	const dispatch = useDispatch();

	const onChange = async (event) => {
		const isSuccess = await dispatch(addRoleAsyncThunk({ user_id: user._id }));
		if (isSuccess) {
			dispatch(setSnackbarMessage(UI_STRINGS.SUCCESS));
			dispatch(setSignInActiveRole(event.target.value));
		} else if (isSuccess.message) {
			dispatch(setSnackbarMessage(isSuccess.message));
		}
	};

	return (
		<FormControl fullWidth>
			<InputLabel id="role-selector">{UI_STRINGS.USER_ROLE}</InputLabel>
			<Select
				labelId="role-selector"
				value={user.activeRole}
				label="Role"
				onChange={onChange}
			>
				{user &&
					user.roles.map((userRole) => (
						<MenuItem key={userRole} value={userRole}>
							{userRole}
						</MenuItem>
					))}
			</Select>
		</FormControl>
	);
};

export default memo(RoleSelector);

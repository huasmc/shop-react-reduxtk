import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSnackbarMessage } from "../../AppSlice";
import { UI_STRINGS } from "../assets/UI_STRINGS";
import { selectSignInUser, setSignInActiveRole } from "../signIn/SignInSlice";
import { addRoleAsyncThunk } from "./thunks/AddRoleAsyncThunk";
import withAuth from "../auth/WithAuth";

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
				value={user && user.activeRole}
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

export default memo(withAuth(RoleSelector));

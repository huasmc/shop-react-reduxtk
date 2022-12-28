import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UI_STRINGS } from "../assets/UI_STRINGS";
import { selectSignInUser } from "../signIn/SignInSlice";
import { addRoleAsyncThunk } from "./thunks/RoleAsyncThunk";
import withAuth from "../auth/WithAuth";
import { ROLES } from "../assets/roles";

const RoleSelector = () => {
	const { user, activeRole } = useSelector(selectSignInUser);
	const dispatch = useDispatch();

	const onChange = useCallback((event) => {
		const activeRole = event.target.value;
		dispatch(addRoleAsyncThunk({ user_id: user._id, activeRole }, dispatch));
	}, []);

	return (
		<FormControl fullWidth>
			<InputLabel id="role-selector">{UI_STRINGS.USER_ROLE}</InputLabel>
			<Select
				labelId="role-selector"
				value={activeRole}
				label="Role"
				onChange={onChange}
				style={{ background: "#FAFAFA" }}
			>
				{ROLES.map((userRole) => (
					<MenuItem key={userRole} value={userRole}>
						{userRole}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export default memo(withAuth(RoleSelector));

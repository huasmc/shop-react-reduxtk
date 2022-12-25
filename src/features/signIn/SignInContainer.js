import { Box, Button, Grid, TextField } from "@mui/material";
import { memo, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UI_STRINGS } from "../assets/UI_STRINGS";
import StatusComponent from "../common/StatusComponent";
import { useNavigate } from "react-router-dom";
import {
	selectSignInLoading,
	selectSignInUser,
	signInAsyncThunk,
} from "./SignInSlice";

const SignInContainer = () => {
	const loading = useSelector(selectSignInLoading);
	const success = useSelector(selectSignInLoading);
	const user = useSelector(selectSignInUser);
	const [username, setUsername] = useState();
	const [password, setPassword] = useState();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const onSignInClick = useCallback(() => {
		if (username && password) {
			dispatch(signInAsyncThunk({ username, password }));
		}
	}, [username, password, dispatch]);

	useEffect(() => {
		if (user) navigate("/shop");
	}, [user, navigate]);

	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				height: "100vh",
			}}
		>
			{!loading && !success && (
				<Grid container spacing={2}>
					<Grid container spacing={4} justifyContent="center">
						<h1>{UI_STRINGS.SIGN_IN}</h1>
					</Grid>
					<Grid item xs={12}>
						<TextField
							onChange={(event) => setUsername(event.target.value)}
							id="username"
							label="username"
							variant="outlined"
							fullWidth
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							onChange={(event) => setPassword(event.target.value)}
							id="password"
							label="Password"
							variant="outlined"
							fullWidth
						/>
					</Grid>
					<Grid item xs={12}>
						<Button
							onClick={onSignInClick}
							disabled={!username || !password}
							variant="contained"
							fullWidth
						>
							{UI_STRINGS.SIGN_IN}
						</Button>
					</Grid>
				</Grid>
			)}
			{loading && !success && (
				<StatusComponent
					message={loading && !success ? UI_STRINGS.LOADING : UI_STRINGS.SUCESS}
				/>
			)}
		</Box>
	);
};

export default memo(SignInContainer);

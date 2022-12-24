import { Box, Button, Grid, TextField } from "@mui/material";
import { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSignInLoading, signInAsyncThunk } from "./SignInSlice";

const SignInContainer = () => {
	const loading = useSelector(selectSignInLoading);
	const success = useSelector(selectSignInLoading);
	const [username, setUsername] = useState();
	const [password, setPassword] = useState();
	const dispatch = useDispatch();

	const onSignInClick = () => {
		if (username && password) {
			dispatch(signInAsyncThunk({ username, password }));
		}
	};
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
						<h1>Sign-in</h1>
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
							Sign-in
						</Button>
					</Grid>
				</Grid>
			)}
			{loading && !success && (
				<Grid container spacing={2}>
					<h1>Loading</h1>
				</Grid>
			)}
			{success && (
				<Grid container spacing={2}>
					<h1>Success</h1>
				</Grid>
			)}
		</Box>
	);
};

export default memo(SignInContainer);

import { Box, Grid, TextField } from "@mui/material";
import { memo } from "react";

const SignInContainer = () => {
	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				height: "100vh",
			}}
		>
			<Grid container spacing={2}>
				<Grid container spacing={4} justifyContent="center">
					<h1>Sign-in</h1>
				</Grid>
				<Grid item xs={12}>
					<TextField
						id="username"
						label="Username"
						variant="outlined"
						fullWidth
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						id="password"
						label="Password"
						variant="outlined"
						fullWidth
					/>
				</Grid>
			</Grid>
		</Box>
	);
};

export default memo(SignInContainer);

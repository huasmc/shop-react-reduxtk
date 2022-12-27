import { Box, Button, Grid, TextField } from "@mui/material";
import { memo } from "react";
import { UI_STRINGS } from "../../assets/UI_STRINGS";

const SignInComponent = ({
	setUsername,
	setPassword,
	onSignInClick,
	onSignUpClick,
	isButtonDisabled,
}) => {
	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				height: "100vh",
			}}
		>
			{
				<Grid container spacing={2}>
					<Grid container spacing={4} justifyContent="center">
						<h1 style={{ color: "white" }}>{UI_STRINGS.SIGN_IN}</h1>
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
							type="password"
							fullWidth
						/>
					</Grid>
					<Grid
						container
						spacing={4}
						justifyContent="center"
						style={{ marginTop: "5px" }}
					>
						<Grid item xs={4}>
							<Button
								onClick={onSignInClick}
								disabled={isButtonDisabled}
								variant="contained"
								fullWidth
							>
								{UI_STRINGS.SIGN_IN}
							</Button>
						</Grid>
						<Grid item xs={4}>
							<Button
								onClick={onSignUpClick}
								disabled={isButtonDisabled}
								variant="contained"
								fullWidth
							>
								{UI_STRINGS.SIGN_UP}
							</Button>
						</Grid>
					</Grid>
				</Grid>
			}
		</Box>
	);
};

export default memo(SignInComponent);

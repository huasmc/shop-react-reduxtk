import { Box, Snackbar } from "@mui/material";
import { memo, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
	selectSignInLoading,
	selectSignInMessage,
	selectSignInUser,
	signInAsyncThunk,
	signUpAsyncThunk,
} from "./SignInSlice";
import { isAuthenticated } from "../../service/isAuthenticated";
import SignInComponent from "./components/SignInComponent";

const SignInContainer = () => {
	const loading = useSelector(selectSignInLoading);
	const message = useSelector(selectSignInMessage);
	const [signUpSnackbar, setSignUpSnackbar] = useState(false);
	const user = useSelector(selectSignInUser);
	const [username, setUsername] = useState();
	const [password, setPassword] = useState();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const onSignInClick = useCallback(() => {
		if (!loading && username && password) {
			dispatch(signInAsyncThunk({ username, password }));
		}
	}, [username, password, loading, dispatch]);

	const onSignUpClick = useCallback(() => {
		if (!loading && username && password) {
			dispatch(signUpAsyncThunk({ username, password }));
		}
	}, [username, password, loading, dispatch]);

	useEffect(() => {
		if (user && isAuthenticated(user.access_token)) {
			navigate("/shop");
		}
	}, [user, navigate]);

	useEffect(() => {
		if (message !== "") setSignUpSnackbar(true);
	}, [message]);

	const handleSnackbarClose = () => setSignUpSnackbar(false);

	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				height: "100vh",
			}}
		>
			<SignInComponent
				setUsername={setUsername}
				setPassword={setPassword}
				onSignInClick={onSignInClick}
				onSignUpClick={onSignUpClick}
				isButtonDisabled={!username || !password}
			/>
			<Snackbar
				open={signUpSnackbar}
				autoHideDuration={3000}
				onClose={handleSnackbarClose}
				message={message}
			/>
		</Box>
	);
};

export default memo(SignInContainer);

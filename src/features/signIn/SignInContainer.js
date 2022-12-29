import { Box } from "@mui/material";
import { memo, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
	selectSignInMessage,
	selectSignInUser,
	signInAsyncThunk,
	signUpAsyncThunk,
} from "./SignInSlice";
import { isAuthenticated } from "../../service/isAuthenticated";
import SignInComponent from "./components/SignInComponent";
import { setAppLoading, setSnackbarMessage } from "../../AppSlice";

const SignInContainer = () => {
	const message = useSelector(selectSignInMessage);
	const user = useSelector(selectSignInUser);
	const [username, setUsername] = useState();
	const [password, setPassword] = useState();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const onSignInClick = useCallback(async () => {
		try {
			if (username && password) {
				dispatch(setAppLoading(true));
				await dispatch(signInAsyncThunk({ username, password }, dispatch));
			}
		} catch (error) {
			dispatch(setAppLoading(false));
		}
	}, [username, password, dispatch]);

	const onSignUpClick = useCallback(() => {
		if (username && password) {
			dispatch(signUpAsyncThunk({ username, password }));
		}
	}, [username, password, dispatch]);

	useEffect(() => {
		if (user && isAuthenticated(user.access_token)) {
			navigate("/shop");
		}
	}, [user, navigate]);

	useEffect(() => {
		if (message !== "") dispatch(setSnackbarMessage(message));
	}, [message, dispatch]);

	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				height: "100vh",
				justifyContent: "center",
			}}
		>
			<SignInComponent
				setUsername={setUsername}
				setPassword={setPassword}
				onSignInClick={onSignInClick}
				onSignUpClick={onSignUpClick}
				isButtonDisabled={!username || !password}
			/>
		</Box>
	);
};

export default memo(SignInContainer);

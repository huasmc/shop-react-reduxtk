import { Box } from "@mui/material";
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
import { setSnackbarMessage } from "../../AppSlice";

const SignInContainer = () => {
	const message = useSelector(selectSignInMessage);
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

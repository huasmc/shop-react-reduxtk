import { memo, useCallback, useEffect, useState } from "react";
import { selectSignInUser } from "../signIn/SignInSlice";
import { Grid, Tooltip } from "@mui/material";
import { useSelector } from "react-redux";
import { decodeToken } from "react-jwt";
import useWindowDimensions from "../../customHooks/useWindowDimensions";
import NarrowMenu from "./menu/NarrowMenu";
import WideMenu from "./menu/WideMenu";

export const SessionTimer = memo(({ router }) => {
	const user = useSelector(selectSignInUser);
	const [timeLeft, setTimeLeft] = useState(0);

	useEffect(() => {
		const token = localStorage.getItem("access_token");
		if (!token) return;
		const decodedToken = decodeToken(token);
		if (!decodedToken) return;
		const { exp } = decodeToken(token);
		const tokenExpiryDate = new Date(exp * 1000);
		const timerId = setInterval(() => {
			const currentDate = new Date();
			const timeDifference = tokenExpiryDate - currentDate;
			if (timeDifference > -1) {
				const timeDifferenceInSeconds = timeDifference / 1000;
				setTimeLeft(Math.round(timeDifferenceInSeconds));
			} else {
				clearInterval(timerId);
				localStorage.clear();
				router.navigate("/");
			}
		}, 1000);
		return () => clearInterval(timerId);
	}, [user, router]);

	return (
		<Tooltip title="Time left in session">
			<span className="session-timer">{timeLeft}</span>
		</Tooltip>
	);
});

const Navigator = ({ router }) => {
	const endSession = useCallback(() => localStorage.clear(), []);
	const { width } = useWindowDimensions();

	return (
		<Grid
			container
			spacing={2}
			position="fixed"
			style={{ backgroundColor: "#004A7C", zIndex: 20 }}
		>
			{762 < width ? (
				<WideMenu router={router} endSession={endSession} />
			) : (
				<NarrowMenu router={router} endSession={endSession} />
			)}
		</Grid>
	);
};

export default memo(Navigator);

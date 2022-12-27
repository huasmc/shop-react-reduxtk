import { memo, useCallback, useEffect, useState } from "react";
import { selectSignInUser } from "../signIn/SignInSlice";
import { UI_STRINGS } from "../assets/UI_STRINGS";
import { Button, Grid, Link, Menu, MenuItem } from "@mui/material";
import { useSelector } from "react-redux";
import { decodeToken } from "react-jwt";
import { paths } from "../router/paths";
import useWindowDimensions from "../../customHooks/useWindowDimensions";

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
		<Grid item xs={2}>
			<span style={{ color: "lightgreen", fontWeight: "bold" }}>
				{UI_STRINGS.TIME_LEFT}: {timeLeft}
			</span>
		</Grid>
	);
});

const WideMenu = ({ endSession }) => {
	return (
		<>
			<Grid item xs={10}>
				{paths.map((path, key) => (
					<Link key={key} href={path.path} style={{ color: "white" }}>
						<span style={{ margin: "10px", fontSize: "27px" }}>
							{path.title}
						</span>
					</Link>
				))}
				<Link
					href="/"
					style={{
						color: "darkred",
					}}
					onClick={endSession}
				>
					<span style={{ margin: "10px", fontSize: "27px" }}>
						{UI_STRINGS.LOG_OUT}
					</span>
				</Link>
			</Grid>
			<SessionTimer />
		</>
	);
};

const NarrowMenu = ({ endSession }) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const handleClick = useCallback((event) => {
		setAnchorEl(event.currentTarget);
	}, []);

	const handleClose = useCallback(() => {
		setAnchorEl(null);
	}, []);

	return (
		<div style={{ margin: "10px 0 0 10px" }}>
			<Button
				id="basic-button"
				aria-controls={open ? "basic-menu" : undefined}
				aria-haspopup="true"
				aria-expanded={open ? "true" : undefined}
				onClick={handleClick}
			>
				<span style={{ color: "white" }}>{UI_STRINGS.MENU}</span>
			</Button>
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					"aria-labelledby": "basic-button",
				}}
			>
				{paths.map((path) => (
					<MenuItem key={path.title} onClick={handleClose}>
						<Link href={path.path}>
							<span>{path.title}</span>
						</Link>
					</MenuItem>
				))}
			</Menu>
		</div>
	);
};

const Navigator = ({ router }) => {
	const endSession = useCallback(() => localStorage.clear(), []);
	const { width } = useWindowDimensions();

	return (
		<Grid
			container
			spacing={2}
			position="fixed"
			style={{ backgroundColor: "#3f648b", zIndex: 20 }}
		>
			{486 < width ? (
				<WideMenu endSession={endSession} />
			) : (
				<NarrowMenu endSession={endSession} />
			)}
		</Grid>
	);
};

export default memo(Navigator);

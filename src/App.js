import { Box, Grid, Snackbar, Backdrop, CircularProgress } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { selectAppLoading, selectSnackbarMessage } from "./AppSlice";
import Navigator from "./features/navigator/Navigator";
import { paths } from "./features/router/paths";

const router = createBrowserRouter(paths);

function App() {
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [backdropLoading, setBackdropLoading] = useState(false);
	const messages = useSelector(selectSnackbarMessage);
	const loading = useSelector(selectAppLoading);
	const previousMessages = useRef(messages);

	const handleSnackbarClose = useCallback(() => setSnackbarOpen(false), []);

	useEffect(() => {
		const isNewMessage =
			JSON.stringify(previousMessages.current) !== JSON.stringify(messages);
		if (messages.length > 0 && isNewMessage) {
			setSnackbarOpen(true);
			previousMessages.current = messages;
		}
	}, [messages]);

	useEffect(() => {
		setBackdropLoading(loading);
	}, [loading]);

	useEffect(() => {
		setBackdropLoading(false);
	}, []);

	window.onload = () => {
		setBackdropLoading(false);
	};

	return (
		<div style={{ background: "#bdb9b9" }}>
			<Grid container spacing={2} justifyContent="center">
				<Grid item row={1} xs={12}>
					<Navigator router={router} />
				</Grid>
				<Grid item row={2} xs={12}>
					<RouterProvider router={router} />
				</Grid>
			</Grid>

			<Snackbar
				open={snackbarOpen}
				autoHideDuration={3000}
				onClose={handleSnackbarClose}
				message={messages[messages.length - 1]}
			/>
			<Backdrop
				sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
				open={backdropLoading}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
		</div>
	);
}

export default App;

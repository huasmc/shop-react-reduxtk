import { Box, Grid, Snackbar } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { selectSnackbarMessage } from "./AppSlice";
import Navigator from "./features/navigator/Navigator";
import { paths } from "./features/router/paths";

const router = createBrowserRouter(paths);

function App() {
	const messages = useSelector(selectSnackbarMessage);
	const [snackbarOpen, setSnackbarOpen] = useState(false);
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

	return (
		<>
			<Box sx={{ flexGrow: 1 }}>
				<Grid container spacing={2} justifyContent="center">
					<Grid item row={1} xs={12}>
						<Navigator />
					</Grid>
					<Grid item row={2}>
						<RouterProvider router={router} />
					</Grid>
				</Grid>
			</Box>

			<Snackbar
				open={snackbarOpen}
				autoHideDuration={3000}
				onClose={handleSnackbarClose}
				message={messages[messages.length - 1]}
			/>
		</>
	);
}

export default App;

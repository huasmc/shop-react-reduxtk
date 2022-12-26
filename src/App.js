import { Container, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { selectSnackbarMessage } from "./AppSlice";
import Navigator from "./features/navigator/Navigator";
import { paths } from "./features/router/paths";

const router = createBrowserRouter(paths);

function App() {
	const message = useSelector(selectSnackbarMessage);
	const handleSnackbarClose = () => setSnackbarOpen(false);

	const [snackbarOpen, setSnackbarOpen] = useState(false);
	useEffect(() => {
		if (message) setSnackbarOpen(true);
	}, [message]);

	return (
		<Container maxWidth="sm">
			<Navigator />
			<RouterProvider router={router} />
			<Snackbar
				open={snackbarOpen}
				autoHideDuration={3000}
				onClose={handleSnackbarClose}
				message={message}
			/>
		</Container>
	);
}

export default App;

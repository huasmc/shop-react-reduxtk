import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { paths } from "./features/router/paths";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Container } from "@mui/material";

const container = document.getElementById("root");
const root = createRoot(container);

const router = createBrowserRouter(paths);

root.render(
	<Provider store={store}>
		<Container maxWidth="sm">
			<RouterProvider router={router} />
		</Container>
	</Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

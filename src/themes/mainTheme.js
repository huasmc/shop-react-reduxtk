import { createTheme } from "@mui/material";

export const mainTheme = createTheme({
	palette: {
		primary: {
			main: "#262626",
			dark: "#FFFFFF",
			light: "#000000",
		},
		mode: "light",
	},
	components: {
		MuiTableContainer: {
			styleOverrides: {
				root: {
					background: "#FAFAFA",
					borderRadius: "40px",
				},
			},
		},
		MuiTableHead: {
			styleOverrides: {
				root: {
					backgroundColor: "#FAFAFA",
					fontSize: "20px",
				},
				sticky: {
					backgroundColor: "#FAFAFA",
				},
			},
		},
		MuiTableBody: {
			styleOverrides: {
				root: {
					backgroundColor: "#FAFAFA",
				},
			},
		},
		MuiTextField: {
			styleOverrides: {
				root: {
					backgroundColor: "#fff",
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					backgroundColor: "#fff",
					color: "#000",
				},
			},
		},
	},
});

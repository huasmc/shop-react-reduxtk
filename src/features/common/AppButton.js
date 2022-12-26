import { Button, CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { red, green } from "@mui/material/colors";

const theme = createTheme({
	palette: {
		primary: red,
	},
});

export default function AppButton({ text, handleClick, disabled }) {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline enableColorScheme />
			<Button
				onClick={handleClick}
				variant="contained"
				disabled={disabled}
				color="primary"
			>
				{text}
			</Button>
		</ThemeProvider>
	);
}

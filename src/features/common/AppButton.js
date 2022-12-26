import { Button, CssBaseline, Tooltip } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { red } from "@mui/material/colors";

const theme = createTheme({
	palette: {
		primary: red,
	},
});

export default function AppButton({ text, handleClick, tooltip, disabled }) {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline enableColorScheme />
			<Tooltip title={tooltip}>
				<span>
					<Button
						onClick={handleClick}
						variant="contained"
						disabled={disabled}
						color="primary"
					>
						{text}
					</Button>
				</span>
			</Tooltip>
		</ThemeProvider>
	);
}

import { Grid } from "@mui/material";

const StatusComponent = ({ message }) => {
	return (
		<Grid container spacing={2}>
			<h1>{message}</h1>
		</Grid>
	);
};

export default StatusComponent;

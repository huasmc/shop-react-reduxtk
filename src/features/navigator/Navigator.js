import { Grid, Link } from "@mui/material";
import { memo } from "react";
import { UI_STRINGS } from "../assets/UI_STRINGS";
import { paths } from "../router/paths";

const Navigator = () => {
	const endSession = () => localStorage.clear();

	return (
		<Grid
			container
			spacing={2}
			position="fixed"
			style={{ backgroundColor: "#3f648b", zIndex: 20 }}
		>
			<Grid item>
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
		</Grid>
	);
};

export default memo(Navigator);

import { Grid, Link } from "@mui/material";
import { memo } from "react";
import { paths } from "../router/paths";

const Navigator = () => {
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
			</Grid>
		</Grid>
	);
};

export default memo(Navigator);

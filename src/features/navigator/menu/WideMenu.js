import { Grid, Link } from "@mui/material";
import { memo } from "react";
import { UI_STRINGS } from "../../assets/UI_STRINGS";
import { paths } from "../../router/paths";
import { SessionTimer } from "../Navigator";

const WideMenu = ({ router, endSession }) => {
	return (
		<>
			<Grid item xs={10}>
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
			<SessionTimer router={router} />
		</>
	);
};
export default memo(WideMenu);

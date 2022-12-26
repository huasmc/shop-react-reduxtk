import { Link } from "@mui/material";
import { memo } from "react";
import { UI_STRINGS } from "../assets/UI_STRINGS";
import { paths } from "../router/paths";

const Navigator = () => {
	return (
		<>
			<h1>{UI_STRINGS.SHOP}</h1>
			{paths.map((path, key) => (
				<Link key={key} href={path.path}>
					<span style={{ margin: "10px" }}>{path.title}</span>
				</Link>
			))}
		</>
	);
};

export default memo(Navigator);

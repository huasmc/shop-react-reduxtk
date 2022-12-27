import { Button, Link, Menu, MenuItem } from "@mui/material";
import { memo, useCallback, useState } from "react";
import { UI_STRINGS } from "../../assets/UI_STRINGS";
import { paths } from "../../router/paths";
import { SessionTimer } from "../Navigator";

const NarrowMenu = ({ router }) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const handleClick = useCallback((event) => {
		setAnchorEl(event.currentTarget);
	}, []);

	const handleClose = useCallback(() => {
		setAnchorEl(null);
	}, []);
	return (
		<div style={{ margin: "10px 0 0 10px" }}>
			<Button
				id="basic-button"
				aria-controls={open ? "basic-menu" : undefined}
				aria-haspopup="true"
				aria-expanded={open ? "true" : undefined}
				onClick={handleClick}
			>
				<span style={{ color: "white" }}>{UI_STRINGS.MENU}</span>
			</Button>
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					"aria-labelledby": "basic-button",
				}}
			>
				{paths.map((path) => (
					<MenuItem key={path.title} onClick={handleClose}>
						<Link href={path.path}>
							<span>{path.title}</span>
						</Link>
					</MenuItem>
				))}
			</Menu>
			<SessionTimer router={router} />
		</div>
	);
};

export default memo(NarrowMenu);

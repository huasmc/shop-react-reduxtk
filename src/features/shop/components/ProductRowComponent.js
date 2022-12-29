import { TableRow, TableCell, TextField } from "@mui/material";
import { memo, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UI_STRINGS } from "../../assets/UI_STRINGS";
import { createOrderAsyncThunk } from "../ShopSlice";
import {
	selectSignInActiveRole,
	selectSignInUser,
} from "../../signIn/SignInSlice";
import AppButton from "../../common/AppButton";
import { ROLES } from "../../assets/roles";
import useIsMobile from "../../../customHooks/useIsMobile";

const ProductRowComponent = ({ product }) => {
	const { user } = useSelector(selectSignInUser);
	const activeRole = useSelector(selectSignInActiveRole);
	const [quantity, setQuantity] = useState(1);
	const isMobile = useIsMobile();
	const dispatch = useDispatch();

	const handleCreateOrder = useCallback(() => {
		if (product && quantity && user.activeRole !== ROLES[0]) {
			const body = { product_id: product.id, quantity, user_id: user._id };
			dispatch(createOrderAsyncThunk(body, dispatch));
		}
	}, [product, quantity, user, dispatch]);
	return (
		<TableRow>
			<TableCell align="left">
				<div style={{ height: "75px", width: "75px" }}>
					<img
						src={product.thumbnail}
						alt=""
						style={{
							maxWidth: "100%",
							maxHeight: "100%",
							borderRadius: "100px",
						}}
					/>
				</div>
			</TableCell>

			{!isMobile && (
				<TableCell align="left">
					<p style={{ fontWeight: "bold" }}>{product.title}</p>
				</TableCell>
			)}
			<TableCell align="left">
				<TextField
					type="number"
					onChange={(event) => setQuantity(event.target.value)}
					placeholder="Qty"
					style={{ width: "70px" }}
					disabled={activeRole !== ROLES[1]}
					defaultValue={quantity}
				/>
			</TableCell>
			<TableCell align="left">
				<p style={{ fontWeight: "bold" }}>${product.price.toLocaleString()}</p>
			</TableCell>
			<TableCell>
				<AppButton
					text={UI_STRINGS.BUY}
					handleClick={handleCreateOrder}
					disabled={activeRole !== ROLES[1]}
					tooltip={UI_STRINGS.USER_ROLE_REQUIRED}
				/>
			</TableCell>
		</TableRow>
	);
};

export default memo(ProductRowComponent);

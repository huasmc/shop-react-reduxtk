import { memo, useCallback, useState } from "react";
import withAuth from "../../auth/WithAuth";
import {
	TableContainer,
	Paper,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Pagination,
} from "@mui/material";
import { UI_STRINGS } from "../../assets/UI_STRINGS";
import OrderRowComponent from "./OrderRowComponent";
const TableHeaders = ["", "Title", "Quantity", "Price"];

const OrdersTableComponent = ({
	ordersObject,
	skipOrders,
	limit,
	setSkipOrders,
}) => {
	const [page, setPage] = useState(1);
	const { orders } = ordersObject;

	const handlePageChange = useCallback(
		(event, newPage) => {
			setSkipOrders(newPage * 5 - 5);
			setPage(newPage);
		},
		[setPage, setSkipOrders]
	);

	const getPageCount = () => {
		const count = ordersObject.count / limit;
		const roundCount = Math.ceil(count);

		return !isNaN(roundCount) ? roundCount : 5;
	};
	return (
		<>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							{TableHeaders.map((header) => (
								<TableCell key={header}>{header}</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{orders && orders.length > 0 ? (
							orders.map((order) => (
								<OrderRowComponent
									key={order._id}
									order={order}
									skipOrders={skipOrders}
									limit={limit}
								/>
							))
						) : (
							<TableRow>
								<TableCell align="left">{UI_STRINGS.YOUR_ORDERS}</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
				<Pagination
					count={getPageCount()}
					onChange={handlePageChange}
					page={page}
				/>
			</TableContainer>
		</>
	);
};

export default memo(withAuth(OrdersTableComponent));

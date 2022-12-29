import { setSnackbarMessage } from "../../AppSlice";
import { UI_STRINGS } from "../../features/assets/UI_STRINGS";

const requestsAsyncThunkMiddleware =
	({ dispatch }) =>
	(next) =>
	(action) => {
		if (action.type.endsWith("/rejected")) {
			dispatch(setSnackbarMessage(UI_STRINGS.SERVER_RUNNING));
		}
		return next(action);
	};

export default requestsAsyncThunkMiddleware;

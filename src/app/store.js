import { composeWithDevTools } from "redux-devtools-extension";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import signInReducer from "../features/signIn/SignInSlice";
import shopReducer from "../features/shop/ShopSlice";
import storage from "redux-persist/lib/storage";
import appReducer from "../AppSlice";
import requestsAsyncThunkMiddleware from "./middlewares/requestsMiddleWare";

const persistConfig = {
	key: "root",
	storage,
	blacklist: ["signInReducer"],
};

const persistSignInConfig = {
	key: "signIn",
	storage,
	blacklist: ["orders"],
};

const rootReducer = combineReducers({
	signInReducer: persistReducer(persistSignInConfig, signInReducer),
	shopReducer: shopReducer,
	appReducer: appReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore(
	{
		reducer: persistedReducer,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({ serializableCheck: false }).concat(
				requestsAsyncThunkMiddleware
			),
	},
	composeWithDevTools()
);

export const persistor = (() => {
	const persistedStore = persistStore(store);
	return {
		...persistedStore,
		dispatch: (action) => {
			if (typeof action === "function") {
				throw new Error("Cannot dispatch a function as an action");
			}
			store.dispatch(action);
		},
	};
})();

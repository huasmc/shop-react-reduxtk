import { composeWithDevTools } from "redux-devtools-extension";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import signInReducer from "../features/signIn/SignInSlice";
import shopReducer from "../features/shop/ShopSlice";
import storage from "redux-persist/lib/storage";
import appReducer from "../AppSlice";

const persistConfig = {
	key: "root",
	storage,
};

const rootReducer = combineReducers({
	signInReducer,
	shopReducer,
	appReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore(
	{
		reducer: persistedReducer,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({ serializableCheck: false }),
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

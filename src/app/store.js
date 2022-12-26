import { configureStore } from "@reduxjs/toolkit";
import signInReducer from "../features/signIn/SignInSlice";
import shopReducer from "../features/shop/ShopSlice";
import appReducer from "../AppSlice";
import { composeWithDevTools } from "redux-devtools-extension";

export const store = configureStore(
	{
		reducer: { signInReducer, shopReducer, appReducer },
	},
	composeWithDevTools()
);

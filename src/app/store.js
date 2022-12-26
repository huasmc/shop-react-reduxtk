import { composeWithDevTools } from "redux-devtools-extension";
import { configureStore } from "@reduxjs/toolkit";
import signInReducer from "../features/signIn/SignInSlice";
import profileReducer from "../features/profile/ProfileSlice";
import shopReducer from "../features/shop/ShopSlice";
import appReducer from "../AppSlice";

export const store = configureStore(
	{
		reducer: { signInReducer, shopReducer, appReducer, profileReducer },
	},
	composeWithDevTools()
);

import { configureStore } from "@reduxjs/toolkit";
import signInReducer from "../features/signIn/SignInSlice";
import shopReducer from "../features/shop/ShopSlice";
export const store = configureStore({
	reducer: { signInReducer, shopReducer },
});

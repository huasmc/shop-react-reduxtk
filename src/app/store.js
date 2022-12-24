import { configureStore } from "@reduxjs/toolkit";
import signInReducer from "../features/signIn/SignInSlice";

export const store = configureStore({
	reducer: { signInReducer },
});

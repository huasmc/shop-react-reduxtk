import ShopContainer from "../shop/ShopContainer";
import SignInContainer from "../signIn/SignInContainer";

export const paths = [
	{
		path: "/",
		element: <SignInContainer />,
	},
	{
		path: "/shop",
		element: <ShopContainer />,
	},
];

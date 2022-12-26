import ProfileContainer from "../profile/ProfileContainer";
import ShopContainer from "../shop/ShopContainer";
import SignInContainer from "../signIn/SignInContainer";

export const paths = [
	{
		title: "Sign-in",
		path: "/",
		element: <SignInContainer />,
	},
	{
		title: "Shop",
		path: "/shop",
		element: <ShopContainer />,
	},
	{
		title: "Profile",
		path: "/profile",
		element: <ProfileContainer />,
	},
];

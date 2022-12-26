export const NEST_BASE_URL = "http://localhost:3000";
export const SHOP_BASE_URL = "https://dummyjson.com";

export const ENDPOINTS = {
	SIGN_IN: `${NEST_BASE_URL}/users/sign-in`,
	SHOP_PRODUCTS: `${SHOP_BASE_URL}/products?`,
	SIGN_UP: `${NEST_BASE_URL}/users/register`,
	ADD_ORDER: `${NEST_BASE_URL}/orders/add`,
	USER_ORDERS: `${NEST_BASE_URL}/orders/user`,
};

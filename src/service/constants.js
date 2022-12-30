export const NEST_BASE_URL = "https://shop-nestjs-mongodb.herokuapp.com";
export const SHOP_BASE_URL = "https://dummyjson.com";

export const ENDPOINTS = {
	SIGN_IN: `${NEST_BASE_URL}/users/sign-in`,
	SHOP_PRODUCTS: `${SHOP_BASE_URL}/products`,
	SIGN_UP: `${NEST_BASE_URL}/users/register`,
	ADD_ORDER: `${NEST_BASE_URL}/orders/add`,
	USER_ORDERS: `${NEST_BASE_URL}/orders/user`,
	ADD_ROLE: `${NEST_BASE_URL}/users/add-admin-role`,
	PROFILE: `${NEST_BASE_URL}/users/profile`,
	UPDATE_ORDER: `${NEST_BASE_URL}/orders/update`,
	DELETE_ORDER: `${NEST_BASE_URL}/orders/delete`,
};

import { ICartItem } from "@/types/cart-item.interface";

const CART_KEY = 'cart';

export const getCart = (): ICartItem[] => {
	const lsCart = localStorage.getItem(CART_KEY);

	return lsCart ? JSON.parse(lsCart) : [];
}

export const saveCart = (cart: ICartItem[]) => {
	if (cart.length > 0) {
		localStorage.setItem(CART_KEY, JSON.stringify(cart));
	} else {
		localStorage.removeItem('cart');
	}
}
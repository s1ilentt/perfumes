import { ICartItem } from '@/types/cart-item.interface';

export const addCartItem = (cart: ICartItem[], id: number, quantity: number) => {
	const existing = cart.find(i => i.id === id);

	if (existing) {
		return cart.map(cartItem =>
			cartItem.id === id
				? { ...cartItem, quantity: Math.min(cartItem.quantity + quantity, 99) }
				: cartItem
		);
	}

	return [...cart, { id, quantity }];
};

export const removeCartItem = (cart: ICartItem[], id: number) => {
	return cart.filter(cartItem => cartItem.id !== id);
};

export const removeQuantityItem = (cart: ICartItem[], id: number) => {
	return cart.map(cartItem =>
		cartItem.id === id ? { ...cartItem, quantity: Math.max(cartItem.quantity - 1, 1) } : cartItem
	);
};

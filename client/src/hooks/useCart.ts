import { ICartItem } from '@/types/cart-item.interface';
import { addCartItem, removeCartItem, removeQuantityItem } from '@/utils/cart-actions';
import { getCart, saveCart } from '@/utils/cart-storage';
import { useEffect, useRef, useState } from 'react';

export function useCart() {
	const [cart, setCart] = useState<ICartItem[]>([]);
	const [isCartLoading, setIsCartLoading] = useState(true);

	const isFirsRender = useRef(true);

	useEffect(() => {
		setCart(getCart());
		setIsCartLoading(false);
	}, []);

	useEffect(() => {
		if (isFirsRender.current) {
			isFirsRender.current = false;
			return;
		}

		saveCart(cart);
	}, [cart]);

	const addToCart = (id: number, quantity: number) => {
		setCart(prev => addCartItem(prev, id, quantity));
	};

	const removeFromCart = (id: number) => {
		setCart(prev => removeCartItem(prev, id));
	};

	const reduceQuantity = (id: number) => {
		setCart(prev => removeQuantityItem(prev, id));
	};

	return { cart, isCartLoading, addToCart, removeFromCart, reduceQuantity };
}

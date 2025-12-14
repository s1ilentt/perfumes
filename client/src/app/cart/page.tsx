import { Metadata } from 'next';
import { ShoppingBasket } from './sections/shopping-bag/ShoppingBag';

export const metadata: Metadata = {
	description: 'Basket selected products',

	openGraph: {
		title: 'Cart',
		description: 'Basket selected products'
	}
};

export default function CartPage() {
	return (
		<>
			<ShoppingBasket />
		</>
	);
}

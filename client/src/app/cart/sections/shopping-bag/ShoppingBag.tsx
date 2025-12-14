'use client';

import { useCart } from '@/hooks/useCart';
import styles from './ShoppingBag.module.scss';
import { useCartProducts } from '@/hooks/useCartProducts';
import { useMemo, useState } from 'react';
import { ProductCard } from './product-card/ProductCard';
import { useCurrency } from '@/hooks/useCurrency';

export function ShoppingBasket() {
	const [isChecked, setIsChecked] = useState(false);
	const [isChangeCurrency, setIsChangeCurrency] = useState(false);
	const { cart, isCartLoading, removeFromCart, addToCart, reduceQuantity } = useCart();

	const { result: products, isLoading } = useCartProducts(cart);

	const usdRate = useCurrency('USD') || 1;

	const rate = isChangeCurrency ? usdRate : 1;

	const totalCount = useMemo(
		() => products.reduce((sum, product) => sum + product.price * product.quantity, 0),
		[products]
	);

	const handleButton = () => {
		if (isChecked) {
			alert('Order successful');
		} else {
			alert('Please accept the conditions');
		}
	};

	if (isCartLoading || isLoading) {
		return null;
	}

	return (
		<section className={styles['bag-section']}>
			<div className='container'>
				{products.length > 0 ? (
					<div className={styles['content-wrapper']}>
						<div className={styles.basket}>
							<div className={styles.header}>
								<h2 className={styles['chapter-name']}>Shopping basket</h2>
							</div>
							<div className={styles['basket-list']}>
								{products.map(product => (
									<ProductCard
										key={product.id}
										rate={rate}
										product={product}
										quantity={product.quantity}
										removeFromCart={removeFromCart}
										reduceQuantity={reduceQuantity}
										addToCart={addToCart}
									/>
								))}
							</div>
						</div>
						<div className={styles['order-summary']}>
							<h2 className={styles['order-title']}>ORDER SUMMARY</h2>
							<div className={styles['order-detail']}>
								<div>
									<span>Subtotal</span>
									<span>
										<span className={styles['currency-symbol']}>
											{isChangeCurrency ? '₴' : '$'}
										</span>
										{totalCount * rate}
									</span>
								</div>
								<div className={styles['shipping-price']}>
									<span>Shipping</span>
									<span>
										<span className={styles['currency-symbol']}>
											{isChangeCurrency ? '₴' : '$'}
										</span>
										{10 * rate}
									</span>
								</div>
							</div>
							<div className={styles['total-price']}>
								<span>Total</span>
								<span>
									<span className={styles['currency-symbol']}>
										{isChangeCurrency ? '₴' : '$'}
									</span>
									{(totalCount + 10) * rate}
								</span>
							</div>
							<button
								type='button'
								className={styles['currency-button']}
								onClick={() => setIsChangeCurrency(prev => !prev)}
							>
								Change currency
							</button>
							<label className={styles['checkbox-block']}>
								<div
									className={`${styles['checkbox-icon']} ${
										isChecked ? styles['checkbox-icon-active'] : ''
									}`}
								></div>
								<input
									className={styles.input}
									checked={isChecked}
									type='checkbox'
									onChange={() => setIsChecked(prev => !prev)}
								/>
								<span className={styles['checkbox-text']}>
									I agree to the Terms and Conditions
								</span>
							</label>
							<button type='button' onClick={handleButton} className={styles.button}>
								Continue
							</button>
						</div>
					</div>
				) : (
					<h2 className={styles['title-not-found']}>Your cart is empty</h2>
				)}
			</div>
		</section>
	);
}

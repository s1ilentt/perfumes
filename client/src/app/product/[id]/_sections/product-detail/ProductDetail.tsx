'use client';

import { useProduct } from '@/hooks/useProduct';
import { useParams } from 'next/navigation';
import styles from './ProductDetail.module.scss';
import Image from 'next/image';
import { Button } from '@/components/UI/button/Button';
import { RaitingStars } from '@/components/UI/raiting-stars/RaitingStars';
import { ChangeEvent, useState } from 'react';
import { useCart } from '@/hooks/useCart';

export function ProductDetail() {
	const [qtyProduct, setQtyProduct] = useState(1);

	const { addToCart } = useCart();

	const params = useParams();
	const id = Number(params.id);

	const { data, isLoading } = useProduct(id);
	const product = data;

	const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
		const value = Number(e.target.value);

		if (value < 1) {
			setQtyProduct(1);
		} else if (value > 99) {
			setQtyProduct(99);
		} else {
			setQtyProduct(value);
		}
	};

	const handleButtonCart = () => {
		if (!product) return;

		addToCart(product.id, qtyProduct);

		alert('The product has been successfully added to cart');
	};

	if (isLoading) {
		return null;
	}

	return (
		<section className={styles.productDetailSection}>
			<div className='container'>
				{product ? (
					<div className={styles.contentWrapper}>
						<div className={styles.imageBlock}>
							<Image
								src={process.env.NEXT_PUBLIC_API_URL + product.photo}
								alt='product image'
								fill
								unoptimized
								style={{ objectFit: 'cover' }}
								priority
							/>
						</div>
						<div className={styles.productInfoWrapper}>
							<h1 className={styles.title}>{product.name}</h1>
							<p className={styles.description}>{product.description}</p>
							<div className={styles.starsRaiting}>
								<RaitingStars mark={product.mark} />
							</div>
							<div className={styles.price}>
								$ <span>{product.price}.00</span>
							</div>
							<div className={styles.quantityProduct}>
								<div className={styles.quantityText}>Qty</div>
								<div className={styles.counter}>
									<button
										type='button'
										disabled={qtyProduct === 1}
										onClick={() => setQtyProduct(prev => prev - 1)}
									>
										-
									</button>
									<input
										value={qtyProduct}
										className={styles.inputQty}
										type='number'
										onChange={handleInput}
									/>
									<button
										type='button'
										disabled={qtyProduct === 99}
										onClick={() => setQtyProduct(prev => prev + 1)}
									>
										+
									</button>
								</div>
							</div>
							<Button onClick={handleButtonCart} background='white'>
								Add to Cart
							</Button>
						</div>
					</div>
				) : (
					<h2 className={styles.notFoundTitle}>Product Not Found</h2>
				)}
			</div>
		</section>
	);
}

import { IProduct } from '@/types/product.interface';
import styles from './ProductCard.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { PAGES } from '@/constants/pages-path';

interface IProductCard {
	rate: number;
	product: IProduct;
	quantity: number;
	addToCart: (id: number, quantity: number) => void;
	reduceQuantity: (id: number) => void;
	removeFromCart: (id: number) => void;
}

export function ProductCard({
	rate,
	product,
	quantity,
	addToCart,
	reduceQuantity,
	removeFromCart
}: IProductCard) {
	return (
		<div className={styles['card-wrapper']}>
			<div className={styles.content}>
				<Link href={PAGES.PRODUCT(product.id)}>
					<div className={styles['image-wrapper']}>
						<Image
							alt='product image'
							src={process.env.NEXT_PUBLIC_API_URL + product.photo}
							fill
							priority
							style={{ objectFit: 'cover' }}
							sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw'
						/>
					</div>
					<div className={styles.description}>
						<span>{product.name}</span>
						{rate > 1 ? (
							<span className={styles['product-price']}>₴ {product.price * rate}</span>
						) : (
							<span className={styles['product-price']}>$ {product.price}</span>
						)}
					</div>
				</Link>
			</div>
			<div className={styles['side-bar']}>
				<button
					type='button'
					className={styles['delete-button']}
					onClick={() => removeFromCart(product.id)}
				>
					<Image alt='cross icon' src='/icons/cross.svg' width={26} height={26} />
				</button>
				<div className={styles['product-management']}>
					<button
						className={styles['button-count']}
						type='button'
						disabled={quantity === 99}
						onClick={() => addToCart(product.id, 1)}
					>
						+
					</button>
					<div className={styles['product-count']}>{quantity}</div>
					<button
						className={styles['button-count']}
						type='button'
						disabled={quantity === 1}
						onClick={() => reduceQuantity(product.id)}
					>
						-
					</button>
				</div>
			</div>
		</div>
	);
}

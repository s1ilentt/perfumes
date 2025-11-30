import { IProduct } from '@/types/product.interface';
import styles from './ProductsSlide.module.scss';
import { ProductItem } from '../product-item/ProductItem';

export function ProductsSlide({ products }: { products: IProduct[] }) {
	return (
		<div
			className={styles.ProductsSlide}
		>
			{products.map((product) =>
				<ProductItem
					key={product.id}
					product={product}
					renderRaitingStars={false}
				/>
			)}
		</div>
	);
}
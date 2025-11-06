import { IProduct } from '@/types/product.interface';
import styles from './ProductItem.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { PAGES } from '@/constants/pages-path';

interface IProductItem {
	product: IProduct
}

export function ProductItem({ product }: IProductItem) {
	return (
		<div className={styles.productItem}>
			<div className={styles.wrapperImage}>
				<Image
					alt='product image'
					src={process.env.NEXT_PUBLIC_API_URL + product.photo}
					fill
					style={{ objectFit: 'cover' }}
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
				/>
			</div>
			<div className={styles.name}>
				<Link href={PAGES.PRODUCT(product.name)}>{product.name}</Link>
			</div>
			<div className={styles.raiting}></div>
			<div className={styles.productInfo}>
				$ <span>{product.price}</span>
				<span className={styles.volume}>100ml</span>
			</div>
		</div>
	)
}

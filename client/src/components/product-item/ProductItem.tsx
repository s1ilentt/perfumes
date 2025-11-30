'use client'

import { IProduct } from '@/types/product.interface';
import styles from './ProductItem.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { PAGES } from '@/constants/pages-path';
import dynamic from 'next/dynamic';

const DynamicRaitingStars = dynamic (
	() => import('../UI/raiting-stars/RaitingStars').then(mod => mod.RaitingStars),
	{ssr: false}
)

interface IProductItem {
	product: IProduct
	imageIsPriority?: boolean
	renderRaitingStars?: boolean
}

export function ProductItem({ product, imageIsPriority = false, renderRaitingStars = true }: IProductItem) {
	return (
		<Link
			className={styles.productItemWrapper}
			href={PAGES.PRODUCT(product.id)}
		>
			<div className={styles.productItem}>
				<div className={styles.wrapperImage}>
					<Image
						alt='product image'
						src={process.env.NEXT_PUBLIC_API_URL + product.photo}
						fill
						priority={imageIsPriority}
						style={{ objectFit: 'cover' }}
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
					/>
				</div>
				<div className={styles.name}>
					{product.name}
				</div>
				{renderRaitingStars && <DynamicRaitingStars mark={product.mark} />}
				<div className={styles.productInfo}>
					$ <span>{product.price}.00</span>
					<span className={styles.volume}>100ml</span>
				</div>
			</div>
		</Link>
	)
}

'use client'

import { Spoiler } from '@/components/spoiler/Spoiler';
import styles from './ProductsList.module.scss';
import { useProducts } from "@/hooks/useProducts";
import { ProductItem } from '@/components/product-item/ProductItem';
import { useCategories } from '@/hooks/useCategories';

export function ProductsList() {
	const { data } = useProducts();
	const products = data?.perfumes
	const { data: categories } = useCategories();
	console.log(products)
	console.log(categories)

	return (
		<section className={styles.productListSection}>
			<div className='container'>
				<div className={styles.header}>
					<h1 className={styles.title}>Best Selling Products</h1>
					<div className={styles.filterBar}>
						<div className={styles.filters}>
							<h3 className={styles.filterTitle}>Filter by</h3>
							<Spoiler
								duration={250}
								oneSpoiler={true}
								className={styles.spoilerBlock}
							>
								<button className={`spoller-button ${styles.spoilerButton}`}>Collections</button>
								<ul hidden className={styles.collectionsList}>
									{categories?.map(category =>
										<li key={category.id}><span>{category.name}</span></li>
									)}
								</ul>
							</Spoiler>
						</div>
					</div>
				</div>
				<div className={styles.productsList}>
					{products?.map(product =>
						<ProductItem key={product.id} product={product} imageIsPriority />
					)}
				</div>
			</div>
		</section>
	)
}

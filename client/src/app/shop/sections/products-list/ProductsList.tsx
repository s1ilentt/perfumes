'use client'

import { Spoiler } from '@/components/spoiler/Spoiler';
import styles from './ProductsList.module.scss';
import { useProducts } from "@/hooks/useProducts";

const collections = [
	{name: 'Coldd1'},
	{name: 'col2'},
	{name: 'cdsfdol3'},
	{name: 'Eodl4'},
	{name: 'codfgfdgl5'},
	{name: 'colfdsgfd5'},
]

export function ProductsList() {
	const { data } = useProducts();
	console.log(data)

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
									{collections.map((collection, index) => 
										<li key={index}><span>{collection.name}</span></li>
									)}
								</ul>
							</Spoiler>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

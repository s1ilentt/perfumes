'use client';

import { Spoiler } from '@/components/spoiler/Spoiler';
import styles from './ProductsList.module.scss';
import { useProducts } from '@/hooks/useProducts';
import { ProductItem } from '@/components/product-item/ProductItem';
import { useCategories } from '@/hooks/useCategories';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Pagination } from '@/components/pagination/Pagination';
import { LocalStorageUpdateEventDetail } from '@/types/local-storage-event.interface';
import { Loader } from '@/components/UI/loader/Loader';

export function ProductsList() {
	const [category, setCategory] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [limit, setLimit] = useState(12);
	const [isClient, setIsClient] = useState(false);

	const isTablet = useMediaQuery({ maxWidth: 1023 });
	const isMobile = useMediaQuery({ maxWidth: 768 });

	useEffect(() => {
		if (isMobile) setLimit(6);
		else if (isTablet) setLimit(9);
		else setLimit(12);
	}, [isMobile, isTablet]);

	useEffect(() => {
		const handler = (event: Event) => {
			const e = event as CustomEvent<LocalStorageUpdateEventDetail>;

			if (e.detail.key === 'category') {
				setCategory(e.detail.value || '');

				setTimeout(() => {
					localStorage.removeItem('category');
				}, 0);
			}
		};

		window.addEventListener('localstorage-update', handler);

		const selectCategory = localStorage.getItem('category');
		if (selectCategory) {
			setCategory(selectCategory);
			localStorage.removeItem('category');
		}

		return () => {
			window.removeEventListener('localstorage-update', handler);
		};
	}, []);

	useEffect(() => {
		setIsClient(true);
	}, []);

	const { data, isLoading, isFetching } = useProducts({
		categoryName: category,
		page: currentPage,
		limit
	});

	const products = data?.perfumes;
	const totalPages = data?.total_pages || 1;
	const { data: categories } = useCategories();

	const handleCategoryName = (categoryName: string) => {
		setCategory(prev => (prev === categoryName ? '' : categoryName));
		setCurrentPage(1);
	};

	if (isLoading) {
		return null;
	}

	return (
		<section className={styles.productListSection}>
			{isClient && isFetching && !isLoading && <Loader />}
			<div className='container'>
				{products ? (
					<>
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
										<button className={`spoller-button ${styles.spoilerButton}`}>
											Collections
										</button>
										<ul hidden className={styles.collectionsList}>
											{categories?.map(category => (
												<li
													onClick={() => handleCategoryName(category.name)}
													key={category.id}
												>
													<span>{category.name}</span>
												</li>
											))}
										</ul>
									</Spoiler>
								</div>
							</div>
						</div>
						<div className={styles.productsList}>
							{products.map(product => (
								<ProductItem key={product.id} product={product} imageIsPriority />
							))}
						</div>
						<Pagination page={currentPage} setPage={setCurrentPage} totalPages={totalPages} />
					</>
				) : (
					<h2 className={styles.notFoundTitle}>Products Not Found</h2>
				)}
			</div>
		</section>
	);
}

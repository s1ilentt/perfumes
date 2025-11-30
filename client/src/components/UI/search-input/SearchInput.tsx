'use client';

import { PAGES } from '@/constants/pages-path';
import styles from './SearchInput.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useProducts } from '@/hooks/useProducts';
import { createPortal } from 'react-dom';
import { IProduct } from '@/types/product.interface';

export function SearchInput({ isShow, hideFunction }: { isShow: boolean, hideFunction: () => void }) {
	const [searchValue, setSearchValue] = useState('');
	const [arraySortedProducts, setArraySortedProducts] = useState<IProduct[]>([])
	const ref = useRef<HTMLDivElement>(null);
	const blockRef = useRef<HTMLDivElement>(null);
	const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);

	useEffect(() => {
		setPortalContainer(document.body);
	}, []);

	const [coords, setCoords] = useState({
		top: 0,
		left: 0,
	});

	const { data } = useProducts({
		categoryName: '',
		page: 1,
		limit: 999
	})
	const products = data?.perfumes

	useEffect(() => {
		if (searchValue && products) {
			setArraySortedProducts(products.filter((product) =>
				product.name.toLowerCase().includes(searchValue.toLowerCase()))
			);
		}
	}, [searchValue, products])

	useEffect(() => {
		const el = blockRef.current;
		if (!el) return;

		const rect = el.getBoundingClientRect();
		setCoords({
			top: rect.top + 43,
			left: rect.left
		});

		const handleResize = () => {
			const rect = el.getBoundingClientRect();
			setCoords({
				top: rect.top + 43,
				left: rect.left
			});
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [isShow]);

	useEffect(() => {
		const bodyInput = ref.current;

		if (bodyInput) {
			searchValue ? bodyInput.classList.add(styles.inputBodyActive)
				: bodyInput.classList.remove(styles.inputBodyActive);
		}
	}, [searchValue]);

	useEffect(() => {
		const bodyInput = ref.current;

		document.addEventListener('click', clickOutsideInput);

		function clickOutsideInput(event: MouseEvent) {
			if (!bodyInput) return
			const target = event.target as HTMLElement | null
			if (!target) return

			if (!bodyInput.classList.contains(styles.inputBodyActive) && searchValue) {
				if (target.closest(`.${styles.inputWrapper}`) && target.closest(`.${styles.inputActive}`)) {
					bodyInput.classList.add(styles.inputBodyActive);
				}
			}

			if (!target.closest(`.${styles.inputBlock}`) && !target.closest(`.${styles.inputBody}`)) {
				bodyInput.classList.remove(styles.inputBodyActive);
			}
		}

		return () => {
			document.removeEventListener('click', clickOutsideInput);
		};
	}, [searchValue, isShow]);

	useEffect(() => {
		const bodyInput = ref.current;

		if (bodyInput && !isShow) {
			bodyInput.classList.remove(styles.inputBodyActive);
		}
	}, [isShow]);

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
	}

	return (
		<>
			<div
				ref={blockRef}
				className={styles.inputBlock}
			>
				<div className={styles.inputWrapper}>
					<input
						className={`${styles.input} ${isShow ? styles.inputActive : ''}`}
						type="text"
						value={searchValue}
						placeholder='Search...'
						onChange={handleInputChange}
					/>
				</div>
			</div>
			{portalContainer && isShow &&
				createPortal(
					<div
						ref={ref}
						className={styles.inputBody}
						style={{
							top: coords.top,
							left: coords.left,
							zIndex: 999999,
						}}
					>
						{arraySortedProducts?.length
							? <h4 className={styles.inputBodyHeader}>PRODUCTS</h4>
							: <h4 style={{ textAlign: 'center' }} className={styles.inputBodyHeader}>
								PRODUCT NOT FOUND
							</h4>
						}
						<ul className={styles.inputList}>
							{arraySortedProducts?.map((product) =>
								<li
									key={product.id}
								>
									<Link
										href={PAGES.PRODUCT(product.id)}
										onClick={() => hideFunction()}
									>
										<div className={styles.itemWrapper}>
											<div className={styles.imageWrapper}>
												<Image
													src={process.env.NEXT_PUBLIC_API_URL + product.photo}
													alt='Product image'
													fill
													style={{ objectFit: 'cover' }}
													sizes='60px'
												/>
											</div>
											<div className={styles.productText}>
												<p className={styles.productName}>
													{product.name}
												</p>
												<div className={styles.productPrice}>
													$ {product.price}.00
												</div>
											</div>
										</div>
									</Link>
								</li>
							)}
						</ul>
					</div>,
					portalContainer
				)}
		</>
	)
}
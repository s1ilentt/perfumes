'use client'

import dynamic from 'next/dynamic';
import styles from './BestSellingProducts.module.scss';

const DynamicSliderSwiper = dynamic (
	() => import('@/components/slider/SliderSwiper').then(mod => mod.SliderSwiper),
	{ssr: false}
)

export function BestSellingProducts() {
	return (
		<section className={styles.bestSellingSection}>
			<div className="container">
				<DynamicSliderSwiper titleText={'Best Selling Products'}/>
			</div>
		</section>
	)
}

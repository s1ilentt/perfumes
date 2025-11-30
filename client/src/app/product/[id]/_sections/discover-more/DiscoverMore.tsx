'use client'

import styles from './DiscoverMore.module.scss';
import dynamic from 'next/dynamic';

const DynamicSliderSwiper = dynamic (
	() => import('@/components/slider/SliderSwiper').then(mod => mod.SliderSwiper),
	{ssr: false}
)

export function DiscoverMore() {
	return (
		<section className={styles.discoverMoreSection}>
			<div className="container">
				<DynamicSliderSwiper titleText={'Discover More'}/>
			</div>
		</section>
	)
}

"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./SliderSwiper.module.scss";
import { useProducts } from "@/hooks/useProducts";
import { ProductsSlide } from "../products-slide/ProductsSlide";
import { useMediaQuery } from "react-responsive";

export function SliderSwiper({ titleText }: { titleText: string }) {
	const isMobile = useMediaQuery({ maxWidth: 500 });

	const { data } = useProducts({
		categoryName: '',
		page: 1,
		limit: 12
	});
	const products = data?.perfumes || [];

	return (
		<>
			<h2 className={styles.title}>{titleText}</h2>
			<div className={styles.swiperWrapper}>
				<Swiper
					className={styles.swiper}
					style={{ padding: isMobile ? '0 35px' : '0 50px' }}
					modules={[Navigation, A11y]}
					slidesPerView={1}
					slidesPerGroup={1}
					touchAngle={30}
					autoHeight
					loop
					navigation={{
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev',
					}}
					breakpoints={{
						320: {
							spaceBetween: 50,
							touchRatio: 0.65,
							speed: 500,
						},
						500: {
							spaceBetween: 100,
							touchRatio: 0.75,
							speed: 600,
						},
					}}
				>
					{[0, 4, 8].map((i) => (
						<SwiperSlide key={i}>
							<ProductsSlide products={products.slice(i, i + 4)} />
						</SwiperSlide>
					))}
					<div className='swiper-button-prev'></div>
					<div className='swiper-button-next'></div>
				</Swiper>
			</div>
		</>
	);
}

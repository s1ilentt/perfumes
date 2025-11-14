'use client'

import Image from 'next/image';
import styles from './RaitingStars.module.scss';
import { useMediaQuery } from 'react-responsive';

interface IRaitingStars {
	mark: number
}

export function RaitingStars({ mark }: IRaitingStars) {
	const isMobile = useMediaQuery({ maxWidth: 430 })

	const activeWidth = isMobile
	? 8 * mark + 12 * Math.floor(mark) + 3
	: 10.5 * mark + 17 * Math.floor(mark) + 4
	
	return (
		<div className={styles.raitingStars}>
			<div className={styles.inactiveStars}>
				<Image src='/icons/star.svg' alt='star icon' width={18.5} height={17.5} className={styles.star} />
				<Image src='/icons/star.svg' alt='star icon' width={18.5} height={17.5} className={styles.star} />
				<Image src='/icons/star.svg' alt='star icon' width={18.5} height={17.5} className={styles.star} />
				<Image src='/icons/star.svg' alt='star icon' width={18.5} height={17.5} className={styles.star} />
				<Image src='/icons/star.svg' alt='star icon' width={18.5} height={17.5} className={styles.star} />
			</div>
			<div
				className={styles.activeStars}
				style={{ width: `${activeWidth}px` }}
			>
				<Image src="/icons/star-full.svg" alt="star icon" width={18.5} height={17.5} className={styles.star} />
				<Image src='/icons/star-full.svg' alt='star icon' width={18.5} height={17.5} className={styles.star} />
				<Image src='/icons/star-full.svg' alt='star icon' width={18.5} height={17.5} className={styles.star} />
				<Image src='/icons/star-full.svg' alt='star icon' width={18.5} height={17.5} className={styles.star} />
				<Image src='/icons/star-full.svg' alt='star icon' width={18.5} height={17.5} className={styles.star} />
			</div>
			<div className={styles.markValue}>{`(${mark})`}</div>
		</div>
	)
}

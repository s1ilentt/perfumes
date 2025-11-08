import Image from 'next/image';
import styles from './RaitingStars.module.scss';

interface IRaitingStars {
	mark: number
}

export function RaitingStars({ mark }: IRaitingStars) {
	return (
		<div className={styles.raitingStars}>
			<div className={styles.inactiveStars}>
				<Image src='/icons/star.svg' alt='star icon' width={18.5} height={17.5} />
				<Image src='/icons/star.svg' alt='star icon' width={18.5} height={17.5} />
				<Image src='/icons/star.svg' alt='star icon' width={18.5} height={17.5} />
				<Image src='/icons/star.svg' alt='star icon' width={18.5} height={17.5} />
				<Image src='/icons/star.svg' alt='star icon' width={18.5} height={17.5} />
			</div>
			<div
				className={styles.activeStars}
				style={{ width: `${10.5 * mark + 17 * Math.floor(mark) + 4}px` }}
			>
				<Image src="/icons/star-full.svg" alt="star icon" width={18.5} height={17.5} />
				<Image src='/icons/star-full.svg' alt='star icon' width={18.5} height={17.5} />
				<Image src='/icons/star-full.svg' alt='star icon' width={18.5} height={17.5} />
				<Image src='/icons/star-full.svg' alt='star icon' width={18.5} height={17.5} />
				<Image src='/icons/star-full.svg' alt='star icon' width={18.5} height={17.5} />
			</div>
			<div className={styles.markValue}>{`(${mark})`}</div>
		</div>
	)
}

import { IOffer } from '@/types/offer.interface';
import styles from './Offer.module.scss';
import Image from 'next/image';
import { Button } from '../UI/button/Button';

interface IOfferProps {
	offerInfo: IOffer
	secondOffer: boolean
}

export function Offer({ offerInfo, secondOffer }: IOfferProps) {
	return (
		<div className={`${styles.offer} ${secondOffer ? styles.offerRight : ''}`}>
			<div className={`${styles.container} ${secondOffer ? styles.containerRight : ''}`}>
				<div className={styles.imageBlock}>
					<Image
						src={offerInfo.image}
						alt='product image'
						fill
						style={{ objectFit: 'cover' }}
						sizes="(max-width: 430px) 100%, (max-width: 768px) 75%, 33%"
					/>
				</div>
				<div className={styles.textBlockWrapper}>
					<h2 className={styles.title}>
						{offerInfo.title}
					</h2>
					<div>
						<div className={styles.name}>{offerInfo.name}</div>
						<div className={styles.notes}>{offerInfo.notes}</div>
						<p className={styles.description}>{offerInfo.description}</p>
						<Button background='transparent'>Know More</Button>
					</div>
				</div>
			</div>
		</div>
	)
}

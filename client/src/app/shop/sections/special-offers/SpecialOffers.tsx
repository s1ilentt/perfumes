import { IOffer } from '@/types/offer.interface';
import styles from './SpecialOffers.module.scss';
import { Offer } from '@/components/offer/Offer';

const firstOffer: IOffer = {
	title: 'Limited Time Offer: 20% OFF on Aqua Serenity Perfume!',
	name: 'Aqua Serenity',
	notes: 'Embrace the Tranquil Tides',
	description: 'Immerse yourself in the calming embrace of Aqua Serenity, a captivating fragrance that evokes the essence of water.',
	image: '/images/aqua-serenity.webp'
}

const secondOffer: IOffer = {
	title: 'Limited Time Offer: 25% OFF on Golden Angel Perfume!',
	name: 'Golden Angel',
	notes: 'Unleash Your Divine Glow',
	description: 'Indulge in the divine allure of Golden Angel, a fragrance that embodies celestial elegance and radiance.',
	image: '/images/golden-angel.webp'
}

export function SpecialOffers() {
	return (
		<section className={styles.specialOffersSection}>
			<h2 className={styles.title}>Special Offers</h2>
			<Offer offerInfo={firstOffer} secondOffer={false} />
			<Offer offerInfo={secondOffer} secondOffer />
		</section>
	)
}

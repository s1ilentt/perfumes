import Image from "next/image";
import styles from './SpecialOffer.module.scss';
import { Button } from "@/components/UI/button/Button";

export function SpecialOffer() {
	return (
		<section className={styles.specialOfferSections}>
			<div className='container'>
				<div className={styles.contentWrapper}>
					<div className={styles.textBlockWrapper}>
						<div className={styles.textBlock}>
							<h1 className={styles.title}>
								Elevate Your Spirit with Victory Scented Fragrances!
							</h1>
							<p className={styles.text}>
								Shop now and embrace the sweet smell of victory with Local Face.
							</p>
						</div>
						<Button>Shop Now</Button>
					</div>
					<div className={styles.imageBlock}>
						<Image
							src='/images/special-offer.webp'
							alt='product image'
							fill
							priority
							style={{ objectFit: 'cover' }}
							sizes="(max-width: 768px) 100%, 33%"
						/>
					</div>
				</div>
			</div>
		</section>
	)
}

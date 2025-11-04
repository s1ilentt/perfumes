import Image from 'next/image';
import styles from './OurValues.module.scss';

export function OurValues() {
	return (
		<section className={styles.ourValuesSection}>
			<div className={styles.container}>
				<div className={styles.imageBlock}>
					<Image
						src='/images/our-values.webp'
						alt='product image'
						fill
						style={{ objectFit: 'cover' }}
						sizes="(max-width: 430px) 100%, (max-width: 768px) 75%, 33%"
					/>
				</div>
				<div className={styles.textBlockWrapper}>
					<h2 className={styles.title}>
						Our Values
					</h2>
					<div className={styles.text}>
						<p>
							At Local Face, our perfume retail store is built on a foundation of passion
							and authenticity. We believe in celebrating the individuality of every customer,
							providing a diverse collection of scents that resonate with their unique
							personality and style. Our dedicated team of fragrance enthusiasts is
							committed to creating a welcoming and inclusive environment, where
							connections are forged, and inspiration thrives.
						</p>
						<p>
							Embracing sustainability and continuous learning, Local Face strives
							to be more than just a shopping destination; we are a community that
							inspires and empowers individuals on their fragrance journey.
						</p>
					</div>
				</div>
			</div>
		</section>
	)
}

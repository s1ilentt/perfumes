import Image from 'next/image';
import styles from './Collections.module.scss';

export function Collections() {
	return (
		<section className={styles.collectionsSection}>
			<div className='container'>
				<h2 className={styles.title}>Our Collections</h2>
				<div className={styles.gallery}>
					<div className={styles.row}>
						<div className={styles.imageWrapper_1}>
							<Image
								src='/images/gallery-img-1.webp'
								alt='product image'
								fill
								unoptimized
								style={{ objectFit: 'cover' }}
							/>
							<div className={styles.imageText_1}>Designer Delights Collection</div>
						</div>
						<div className={styles.imageWrapper_2}>
							<Image
								src='/images/gallery-img-2.webp'
								alt='product image'
								fill
								unoptimized
								style={{ objectFit: 'cover' }}
							/>
							<div className={styles.imageText_1}>Travel Essentials Collection</div>
						</div>
					</div>
					<div className={styles.row}>
						<div className={styles.imageWrapper_3}>
							<Image
								src='/images/gallery-img-3.webp'
								alt='product image'
								fill
								unoptimized
								style={{ objectFit: 'cover' }}
							/>
							<div className={styles.imageText_2}>Special Occasions Collection</div>
						</div>
						<div className={styles.imageWrapper_4}>
							<Image
								src='/images/gallery-img-4.webp'
								alt='product image'
								fill
								unoptimized
								style={{ objectFit: 'cover' }}
							/>
							<div className={styles.imageText_2}>Seasonal Sensations Collection</div>
						</div>
					</div>
					<div className={styles.row}>
						<div className={styles.imageWrapper_5}>
							<Image
								src='/images/gallery-img-5.webp'
								alt='product image'
								fill
								unoptimized
								style={{ objectFit: 'cover' }}
							/>
							<div className={styles.imageText_3}>Vintage Treasures</div>
						</div>
						<div className={styles.imageWrapper_6}>
							<Image
								src='/images/gallery-img-6.webp'
								alt='product image'
								fill
								unoptimized
								style={{ objectFit: 'cover' }}
							/>
							<div className={styles.imageText_3}>Limited Edition Treasures</div>
						</div>
						<div className={styles.imageWrapper_7}>
							<Image
								src='/images/gallery-img-7.webp'
								alt='product image'
								fill
								unoptimized
								style={{ objectFit: 'cover' }}
							/>
							<div className={styles.imageText_3}>Modern Classics Collection</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

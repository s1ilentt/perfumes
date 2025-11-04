import Image from 'next/image';
import styles from './Articles.module.scss';

export function Articles() {
	return (
		<section className={styles.articlesSection}>
			<div className='container'>
				<h2 className={styles.title}>Latest Articles</h2>
				<div className={styles.articlesWrapper}>
					<div className={styles.article}>
						<div className={styles.imageWrapper}>
							<Image
								src='/images/article-1.webp'
								alt='article image'
								fill
								unoptimized
								style={{ objectFit: 'cover' }}
							/>
						</div>
						<div>
							<h3 className={styles.articleTitle}>
								The Soothing Symphony of Lavender Perfumes:
								Unlocking the Secrets of a Fragrant Elixir
							</h3>
							<p className={styles.text}>
								Lavender, with its enchanting aroma and rich history, has been cherished
								for centuries as a symbol of relaxation, healing, and timeless beauty.
								In the world of perfumery, lavender plays a key role in creating
								captivating fragrances loved by many.
							</p>
						</div>
					</div>
					<div className={styles.article}>
						<div className={styles.imageWrapper}>
							<Image
								src='/images/article-2.webp'
								alt='article image'
								fill
								unoptimized
								style={{ objectFit: 'cover' }}
							/>
						</div>
						<div>
							<h3 className={styles.articleTitle}>
								The Art of Curating a Luxury Perfume Collection:
								A Symphony of Scents and Stories
							</h3>
							<p className={styles.text}>
								A luxury perfume collection is not just an assortment of fragrances;
								it is a reflection of one's taste, personality, and experiences.
								Each bottle holds a unique olfactory journey, crafted with the
								finest ingredients and artistic mastery.
							</p>
						</div>
					</div>
					<div className={styles.article}>
						<div className={styles.imageWrapper}>
							<Image
								src='/images/article-3.webp'
								alt='article image'
								fill
								unoptimized
								style={{ objectFit: 'cover' }}
							/>
						</div>
						<div>
							<h3 className={styles.articleTitle}>
								The Timeless Elegance of Rose Perfumes:
								Unveiling the Queen of Flowers in Fragrance
							</h3>
							<p className={styles.text}>
								Rose, often referred to as the "Queen of Flowers," has held
								a special place in human culture and history for centuries.
								Beyond its captivating beauty, this iconic bloom has also inspired
								perfumers to create some of the most timeless and exquisite
								fragrances in the world.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

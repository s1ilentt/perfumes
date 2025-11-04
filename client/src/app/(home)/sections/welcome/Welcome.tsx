import styles from './Welcome.module.scss';

export function Welcome() {
	return (
		<section className={styles.welcome}>
			<div className={styles.content}>
				<h2 className={styles.title}>Welcome to Local Face</h2>
				<p className={styles.text}>
					Welcome to Local Face Perfumes, where the spirit ofvictory and
					triumph come alive through scents that empower and inspire. Our
					curated collection, aptly named "Victory Scented," is a celebration
					of success and elegance, designed to unleash your victorious essence.
					Indulge in the sweet taste of triumph with captivating fragrances that
					tell the tale of your achievements. 
					<span>
						At Local Face, we believe that every
						victory deserves a signature scent, and we are dedicated to providing
						unforgettable fragrances that elevate your spirit and empower your journey.
					</span>
				</p>
			</div>
		</section>
	)
}

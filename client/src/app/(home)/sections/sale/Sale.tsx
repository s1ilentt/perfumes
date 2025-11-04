import { Button } from '@/components/UI/button/Button';
import styles from './Sale.module.scss';

export function Sale() {
	return (
		<section className={styles.saleSection}>
			<div className='container'>
				<div className={styles.contentWrapper}>
					<div className={styles.textBlock}>
						<h2 className={styles.title}>Perfume Year-End Sale! Up to 50% OFF</h2>
						<p className={styles.text}>
							Discover an exquisite collection of premium perfumes at unbelievable
							prices during our exclusive Perfume Sale!
						</p>
						<Button>Know more</Button>
					</div>
				</div>
			</div>
		</section>
	)
}

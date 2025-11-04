'use client';

import Link from 'next/link';
import styles from './Footer.module.scss';
import { PAGES } from '@/constants/pages-path';
import Image from 'next/image';
import { IMenuItem } from '@/types/menu-item.interface';
import { Menu } from '../menu/Menu';
import { useState } from 'react';

const PAGES_MENU: IMenuItem[] = [
	{
		href: PAGES.HOME,
		name: 'About Us'
	},
	{
		href: PAGES.SHOP,
		name: 'Shop'
	},
	{
		href: PAGES.CART,
		name: 'Cart'
	},
	{
		href: PAGES.PROFILE,
		name: 'Profile'
	}
]

const CATEGORIES_MENU: IMenuItem[] = [
	{
		href: PAGES.SHOP,
		name: 'Fashion'
	},
	{
		href: PAGES.SHOP,
		name: 'Jawery'
	},
	{
		href: PAGES.SHOP,
		name: 'Sports'
	},
	{
		href: PAGES.SHOP,
		name: 'Outdoor'
	}
]

export function Footer() {
	const [userEmail, setUserEmail] = useState('');

	const handleButtonSubmit = () => {
		const emailValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/;

		if (emailValid.test(userEmail)) {
			alert('Registration completed successfully');
		} else {
			alert('Please enter a valid email address');
		}
	}

	return (
		<footer className={styles.footer}>
			<div className='container'>
				<div className={styles.contentWrapper}>
					<div className={styles.subscribeBlock}>
						<div className={styles.logo}>
							<Link href={PAGES.HOME}>Local Face</Link>
						</div>
						<h3 className={styles.subscribeTitle}>Subscribe to Our Newsletter:</h3>
						<p className={styles.subscribeText}>
							Receive Updates on New Arrivals and Special Promotions!
						</p>
						<div className={styles.inputBlock}>
							<input
								name='email'
								className={styles.input}
								type='email'
								placeholder='Your email here'
								value={userEmail}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserEmail(e.target.value)}
							/>
							<button
								onClick={handleButtonSubmit}
								className={styles.button}
								type='button'
							>
								Submit
							</button>
						</div>
						<div className={styles.socialNetworks}>
							<a href='https://twitter.com' target='_blank' rel="noreferrer noopener">
								<Image src='/icons/twitter.svg' alt='twitter icon' width={32} height={32} />
							</a>
							<a href='https://www.facebook.com' target='_blank' rel="noreferrer noopener">
								<Image src='/icons/facebook.svg' alt='facebook icon' width={32} height={32} />
							</a>
							<a href='https://linkedin.com' target='_blank' rel="noreferrer noopener">
								<Image src='/icons/linkedin.svg' alt='linkedin icon' width={32} height={32} />
							</a>
							<a href='https://www.instagram.com' target='_blank' rel="noreferrer noopener">
								<Image src='/icons/instagram.svg' alt='instagram icon' width={32} height={32} />
							</a>
						</div>
					</div>
					<div className={styles.navBlock}>
						<div>
							<h4 className={styles.menuTitle}>Categories</h4>
							<Menu menuItems={CATEGORIES_MENU} className={styles.footerMenuList}/>
						</div>
						<div>
							<h4 className={styles.menuTitle}>Pages</h4>
							<Menu menuItems={PAGES_MENU} className={styles.footerMenuList}/>
						</div>
					</div>
				</div>
				<div className={styles.copyrightBlock}>
					<a
						href='https://en.wikipedia.org/wiki/All_rights_reserved'
						target='_blank'
						rel="noreferrer noopener"
						className={styles.copyrightLink}
					>
						© Local Face Inc. All rights reserved
					</a>
				</div>
			</div>
		</footer>
	)
}

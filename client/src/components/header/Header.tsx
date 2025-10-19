'use client';

import { IMenuItem } from '@/types/menu-item.interface';
import { Menu } from '../menu/Menu';
import styles from './Header.module.scss';
import { PAGES } from '@/constants/pages-path';
import Link from 'next/link';
import Image from 'next/image';
import { MenuBurger } from '../modals/menu-burger/MenuBurger';
import { useState } from 'react';

const HEADER_MENU: IMenuItem[] = [
	{
		href: PAGES.HOME,
		name: 'Home'
	},
	{
		href: PAGES.SHOP,
		name: 'Shop'
	},
]

export function Header() {
	const [isMenuShow, setIsMenuShow] = useState(false);

	return (
		<header className={styles.headerWrapper}>
			<div className='container'>
				<div className={styles.header}>
					<div className={styles.logo}>
						<Link href={PAGES.HOME}>Local Face</Link>
					</div>
					<Menu
						className={styles.headerMenuList}
						menuItems={HEADER_MENU}
						isMatch
					/>
					<div className={styles.iconList}>
						<Image src="/icons/search.svg" alt="search icon" width={32} height={32} />
						<Link href={PAGES.PROFILE}>
							<Image src="/icons/profile.svg" alt="profile icon" width={26} height={26} />
						</Link>
						<Link href={PAGES.CART}>
							<Image src="/icons/cart.svg" alt="cart icon" width={26} height={26} />
						</Link>
					</div>
					<button
						onClick={() => setIsMenuShow(prev => !prev)}
						className={`${styles.menuBurgerIcon} ${isMenuShow ? styles.menuBurgerIconActive : ''}`}
					>
						<span></span>
					</button>
				</div>
			</div>
			<MenuBurger isActive={isMenuShow} hideFunction={() => setIsMenuShow(false)} />
		</header>
	)
}
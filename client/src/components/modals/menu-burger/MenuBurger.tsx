'use client'
import { useEffect, useRef } from 'react';
import styles from './MenuBurger.module.scss'
import { PAGES } from '@/constants/pages-path';
import { useRouter } from 'next/navigation';

interface Props {
	isActive: boolean
	hideFunction: () => void
}

export function MenuBurger({ isActive, hideFunction }: Props) {
	const menuRef = useRef<HTMLDivElement>(null);
	const route = useRouter();

	useEffect(() => {
		if (isActive) {
			document.body.classList.add('scroll-lock');
		} else if (!isActive) {
			document.body.classList.remove('scroll-lock');
		}
	}, [isActive]);

	useEffect(() => {
		const menu = menuRef.current;
		if(!menu) return

		menu.addEventListener('click', clickOutsideMenuBody);

		function clickOutsideMenuBody(event: MouseEvent) {
			if (menu?.classList.contains(styles.menuActive)) {
				if (!(event.target as HTMLElement).closest(`.${styles.menuBody}`)) {
					hideFunction();
				}
			}
		}

		// Remove the event listener when the component unmounts
		return () => {
			menu.removeEventListener('click', clickOutsideMenuBody);
		};
	}, []);

	const handleLinkClick = (href: string):void => {
		route.push(href);
		hideFunction();
	}

	return (
		<div
			ref={menuRef}
			className={`${styles.menu} ${isActive ? styles.menuActive : ''}`}
		>
			<div className={styles.menuBody}>
				<ul className={styles.menuList}>
					<li className={styles.menuListItem}>
						<a onClick={() => handleLinkClick(PAGES.HOME)}>Home</a>
					</li>
					<li className={styles.menuListItem}>
						<a onClick={() => handleLinkClick(PAGES.SHOP)}>Shop</a>
					</li>
					<li className={styles.menuListItem}>
						<a onClick={() => handleLinkClick(PAGES.CART)}>Cart</a>
					</li>
					<li className={styles.menuListItem}>
						<a onClick={() => handleLinkClick(PAGES.PROFILE)}>Profile</a>
					</li>
				</ul>
			</div>
		</div>
	);
}

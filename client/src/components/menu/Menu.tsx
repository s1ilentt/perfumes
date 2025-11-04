'use client'

import { match } from 'path-to-regexp';
import { MenuItem } from '../menu-item/MenuItem';
import styles from './Menu.module.scss';
import { usePathname } from 'next/navigation';
import { IMenuItem } from '@/types/menu-item.interface';

interface IMenu {
	menuItems: IMenuItem[]
	className?: string
	isMatch?: boolean
}

export function Menu({ menuItems, className, isMatch = false }: IMenu) {
	const pathname = usePathname();

	return (
		<nav>
			<ul className={`${styles.menuList} ${className}`}>
				{menuItems.map((menuItem, index) =>
					<MenuItem
						key={`${menuItem.href}-${index}`}
						href={menuItem.href}
						name={menuItem.name}
						isActive={isMatch ? !!match(menuItem.href)(pathname) : false}
					/>
				)}
			</ul>
		</nav>
	)
}

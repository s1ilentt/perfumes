import { IMenuItem } from '@/types/menu-item.interface';
import styles from './MenuItem.module.scss';
import Link from "next/link"

export function MenuItem({ href, name, isActive }: IMenuItem) {
	return (
		<li>
			<Link
				className={`${isActive ? styles.active : ''}`}
				href={href}
			>
				{name}
			</Link>
		</li>
	)
}

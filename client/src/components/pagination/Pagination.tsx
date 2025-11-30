'use client'

import Image from 'next/image';
import styles from './Pagination.module.scss';
import { handleButtonClick } from '@/utils/handleButtonClick';

interface IPagination {
	page: number
	setPage: React.Dispatch<React.SetStateAction<number>>
	totalPages: number
}

export function Pagination({ page, setPage, totalPages }: IPagination) {
	const handlePrev = () => {
		if (page > 1) setPage(page - 1);
		handleButtonClick();
	};

	const handleNext = () => {
		if (page < totalPages) setPage(page + 1);
		handleButtonClick();
	};

	return (
		<div className={styles.pagination}>
			<button
				onClick={handlePrev}
				className={page === 1 ? styles.disabledButton : ''}
			>
				<Image
					src='/icons/arrow-left.svg'
					alt='button icon'
					width={10}
					height={20} />
			</button>
			<div className={styles.text}>
				Page {page} of {totalPages}
			</div>
			<button
				onClick={handleNext}
				className={page >= totalPages ? styles.disabledButton : ''}
			>
				<Image
					src='/icons/arrow-left.svg'
					alt='button icon'
					width={10}
					height={20}
					style={{ transform: 'rotate(180deg)' }}
				/>
			</button>
		</div>
	)
}

import styles from './Button.module.scss';

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	background?: string;
	children: React.ReactNode;
}

export function Button({ background, children, ...props }: IButton) {
	return (
		<button
			{...props}
			className={`${styles.button} ${background === 'white' ? styles.buttonWhite : ''}`}
		>
			{children}
		</button>
	);
}
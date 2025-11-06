import { HTMLAttributes, ReactNode, useEffect, useRef } from 'react';
import styles from './Spoiler.module.css';

interface ISpoiler extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
	duration: number;
	oneSpoiler: boolean;
	closeByClickOnDocument?: boolean;
	hideSpoilerInStart?: boolean;
}

export const Spoiler = ({
	children,
	duration,
	oneSpoiler,
	closeByClickOnDocument = true,
	hideSpoilerInStart = true,
	...attrs
}: ISpoiler) => {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!ref.current) return;
		
		const spoller = ref.current;

		if (closeByClickOnDocument) {
			document.addEventListener('mouseup', handleClickOutside);
		}

		const spollerTitles = spoller.querySelectorAll('.spoller-button');

		initSpollerBody();

		function initSpollerBody() {
			if (spollerTitles.length > 0) {
				spoller.addEventListener('click', setSpollerAction);

				spollerTitles.forEach(spollerTitle => {
					if (!spollerTitle.classList.contains(styles.buttonActive) && hideSpoilerInStart) {
						(spollerTitle.nextElementSibling as HTMLUListElement).hidden = true;
					} else if (!spollerTitle.classList.contains(styles.buttonActive) && !hideSpoilerInStart) {
						spollerTitle.classList.add(styles.buttonActive);
					}
				})
			}
		}

		function setSpollerAction(event: MouseEvent) {
			const target = event.target;
			if (!(target instanceof HTMLElement)) return;

			if (target.classList.contains('spoller-button') || target.closest('.spoller-button')) {
				const spollerTitle = target.classList.contains('spoller-button') ? target
					: target.closest('.spoller-button') as HTMLButtonElement;

				if (target.closest('.spoller-button')) {
					if (!spoller.querySelectorAll('._slide').length) {
						let isCallSlideUpOneSpoller = false;
						if (oneSpoiler && !spollerTitle.classList.contains(styles.buttonActive)) {
							if (hideSpollersBody(spoller)) {
								isCallSlideUpOneSpoller = true;
								setTimeout(() => {
									spollerTitle.classList.toggle(styles.buttonActive);
									_slideToggle(spollerTitle.nextElementSibling as HTMLUListElement, duration);
								}, duration);
							}
						}
						if (!isCallSlideUpOneSpoller) {
							spollerTitle.classList.toggle(styles.buttonActive);
							_slideToggle(spollerTitle.nextElementSibling as HTMLUListElement, duration);
						}
					}
					event.preventDefault();
				}
			}
		}

		function handleClickOutside(event: MouseEvent) {
			spollerTitles.forEach(spollerTitle => {
				if (!(event.target as HTMLElement).closest('.spoller-button') && spollerTitle.classList.contains(styles.buttonActive)) {
					if (!spoller.querySelectorAll('._slide').length) {
						spollerTitle.classList.remove(styles.buttonActive);
						_slideToggle(spollerTitle.nextElementSibling as HTMLUListElement, duration);
					}
				}
			});
		}

		function hideSpollersBody(spoller: HTMLDivElement) {
			const spollerActiveTitle = spoller.querySelector('.' + styles.buttonActive);
			if (spollerActiveTitle) {
				spollerActiveTitle.classList.remove(styles.buttonActive);
				_slideUp(spollerActiveTitle.nextElementSibling as HTMLUListElement, duration);
				return (true)
			}
		}

		// Function for hidden spoiler
		const _slideUp = (target: HTMLElement, duration: number = 500) => {
			if (!target.classList.contains('_slide')) {
				target.classList.add('_slide');
				target.style.transitionProperty = 'height, margin, padding';
				target.style.transitionDuration = duration + 'ms';
				target.style.height = target.offsetHeight + 'px';
				target.style.overflow = 'hidden';
				void target.offsetHeight;
				target.style.height = '0px';
				target.style.paddingTop = '0px';
				target.style.paddingBottom = '0px';
				target.style.marginTop = '0px';
				target.style.marginBottom = '0px';
				window.setTimeout(() => {
					target.hidden = true;
					target.style.removeProperty('height');
					target.style.removeProperty('margin-top');
					target.style.removeProperty('margin-bottom');
					target.style.removeProperty('padding-top');
					target.style.removeProperty('padding-bottom');
					target.style.removeProperty('overflow');
					target.style.removeProperty('transition-duration');
					target.style.removeProperty('transition-property');
					target.classList.remove('_slide');
				}, duration);
			}
		}

		// Function for show of the spoiler
		const _slideDown = (target: HTMLElement, duration: number = 500) => {
			if (!target.classList.contains('_slide')) {
				target.classList.add('_slide');
				if (target.hidden) {
					target.hidden = false;
				}
				let height = target.offsetHeight;
				target.style.overflow = 'hidden';
				target.style.height = '0px';
				target.style.paddingTop = '0px';
				target.style.paddingBottom = '0px';
				target.style.marginTop = '0px';
				target.style.marginBottom = '0px';
				void target.offsetHeight;
				target.style.transitionProperty = 'height, margin, padding';
				target.style.transitionDuration = duration + 'ms';
				target.style.height = height + 'px';
				target.style.removeProperty('margin-top');
				target.style.removeProperty('margin-bottom');
				target.style.removeProperty('padding-top');
				target.style.removeProperty('padding-bottom');
				window.setTimeout(() => {
					target.style.removeProperty('height');
					target.style.removeProperty('overflow');
					target.style.removeProperty('transition-duration');
					target.style.removeProperty('transition-property');
					target.classList.remove('_slide');
				}, duration)
			}
		}

		// Function for toggle amimation
		const _slideToggle = (target: HTMLElement, duration = 500) => {
			if (target.hidden) {
				return _slideDown(target, duration);
			} else {
				return _slideUp(target, duration);
			}
		}

		return () => {
			document.removeEventListener('mouseup', handleClickOutside);
			spoller.removeEventListener('click', setSpollerAction);
		};
	}, [duration, oneSpoiler, closeByClickOnDocument, hideSpoilerInStart]);

	return (
		<div
			ref={ref}
			{...attrs}
		>
			{children}
		</div>
	);
}
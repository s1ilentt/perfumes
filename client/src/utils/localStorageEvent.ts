import { LocalStorageUpdateEventDetail } from "@/types/local-storage-event.interface";

export function enableLocalStorageEvent() {
	const originalSetItem = localStorage.setItem;

	localStorage.setItem = function (key: string, value: string): void {
		const event = new CustomEvent<LocalStorageUpdateEventDetail>(
			"localstorage-update",
			{
				detail: { key, value }
			}
		);

		window.dispatchEvent(event);

		originalSetItem.call(localStorage, key, value);
	};
}


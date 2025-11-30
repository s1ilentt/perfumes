'use client'

import { useEffect } from "react";
import { enableLocalStorageEvent } from "@/utils/localStorageEvent";

export function LocalStorageEventInit() {
	useEffect(() => {
		enableLocalStorageEvent();
	}, []);

	return null;
}

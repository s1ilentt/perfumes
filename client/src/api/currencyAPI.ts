export interface ICurrency {
	r030: number;
	txt: string;
	rate: number;
	cc: string;
	exchangedate: string;
}

export const fetchCurrency = async (): Promise<ICurrency[]> => {
	const res = await fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json', {
		next: { revalidate: 3600 }
	});

	if (!res.ok) {
		throw new Error('Failed to fetch currency');
	}

	return res.json();
};

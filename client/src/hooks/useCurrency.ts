import { useQuery } from '@tanstack/react-query';
import { fetchCurrency } from '@/api/currencyAPI';
import { useEffect } from 'react';

export function useCurrency(cc: string) {
	const { data, isError } = useQuery({
		queryKey: ['currency', cc],
		queryFn: async () => {
			const data = await fetchCurrency();
			return Math.round(data.find(item => item.cc === cc)?.rate ?? 1);
		},
		staleTime: 1000 * 60 * 60
	});

	useEffect(() => {
		if (isError) console.log('Error fetch currency');
	}, [isError]);

	return data;
}

import { fetchProducts } from '@/api/productAPI';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { ProductsList } from './sections/products-list/ProductsList';
import { SpecialOffers } from './sections/special-offers/SpecialOffers';
import { Metadata } from 'next';

export const revalidate = 180;

export const metadata: Metadata = {
	description: 'Browse our collection of premium perfumes',

	openGraph: {
		title: 'Shop',
		description: 'Browse our collection of premium perfumes'
	}
};

export default async function ShopPage() {
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery({
		queryKey: ['products', '', 1, 12],
		queryFn: () => fetchProducts('', 1, 12)
	});

	return (
		<>
			<HydrationBoundary state={dehydrate(queryClient)}>
				<ProductsList />
			</HydrationBoundary>
			<SpecialOffers />
		</>
	);
}

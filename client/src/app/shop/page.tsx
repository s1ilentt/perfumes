import { fetchProducts } from "@/api/productAPI";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ProductsList } from "./sections/products-list/ProductsList";

export const revalidate = 300;

export default async function ShopPage() {
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery({
		queryKey: ['products'],
		queryFn: () => fetchProducts()
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<ProductsList/>
		</HydrationBoundary>
	)
}

import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { Articles } from "./sections/articles/Articles";
import { BestSellingProducts } from "./sections/best-selling-products/BestSellingProducts";
import { Collections } from "./sections/collections/Collections";
import { OurValues } from "./sections/our-values/OurValues";
import { Sale } from "./sections/sale/Sale";
import { SpecialOffer } from "./sections/special-offer/SpecialOffer";
import { Welcome } from "./sections/welcome/Welcome";
import { fetchProducts } from "@/api/productAPI";

export const revalidate = 180;

export default async function HomePage() {
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery({
		queryKey: ['products', '', 1, 12],
		queryFn: () => fetchProducts('', 1, 12)
	})

	return (
		<>
			<HydrationBoundary state={dehydrate(queryClient)}>
				<SpecialOffer />
				<Welcome />
				<OurValues />
				<BestSellingProducts />
				<Collections />
				<Sale />
				<Articles />
			</HydrationBoundary>
		</>
	)
}

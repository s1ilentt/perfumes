import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { fetchProducts } from "@/api/productAPI";
import dynamic from "next/dynamic";
import { SpecialOffer } from "./sections/special-offer/SpecialOffer";

const Welcome = dynamic(() =>
	import("./sections/welcome/Welcome").then(mod => mod.Welcome)
);
const OurValues = dynamic(() =>
	import("./sections/our-values/OurValues").then(mod => mod.OurValues)
);
const BestSellingProducts = dynamic(() =>
	import("./sections/best-selling-products/BestSellingProducts").then(mod => mod.BestSellingProducts)
);
const Collections = dynamic(() =>
	import("./sections/collections/Collections").then(mod => mod.Collections)
);
const Sale = dynamic(() =>
	import("./sections/sale/Sale").then(mod => mod.Sale)
);
const Articles = dynamic(() =>
	import("./sections/articles/Articles").then(mod => mod.Articles)
);

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

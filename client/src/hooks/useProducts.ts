import { fetchProducts } from "@/api/productAPI";
import { useQuery } from "@tanstack/react-query";

export function useProducts() {
	const { data, isLoading, isError } = useQuery({
		queryKey: ['products'],
		queryFn: fetchProducts
	})

	return { data, isLoading, isError }
}
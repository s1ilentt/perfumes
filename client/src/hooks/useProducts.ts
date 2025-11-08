import { fetchProducts } from "@/api/productAPI";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

interface IUseProducts {
	categoryName?: string
	page?: number
	limit?: number
}

export function useProducts({ categoryName, page, limit }: IUseProducts = {}) {
	const { data, isLoading, isError } = useQuery({
		queryKey: ['products', { categoryName, page, limit }],
		queryFn: () => fetchProducts(categoryName, page, limit),
		placeholderData: keepPreviousData,
	})

	return { data, isLoading, isError }
}
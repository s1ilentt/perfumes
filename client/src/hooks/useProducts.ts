import { fetchProducts } from "@/api/productAPI";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

interface IUseProducts {
	categoryName?: string
	page?: number
	limit?: number
}

export function useProducts({ categoryName = '', page = 1, limit = 12 }: IUseProducts = {}) {
	const { data, isLoading, isError } = useQuery({
		queryKey: ['products', categoryName, page, limit],
		queryFn: () => fetchProducts(categoryName, page, limit),
		staleTime: 1000 * 60 * 3,
		placeholderData: keepPreviousData,
	})

	return { data, isLoading, isError }
}
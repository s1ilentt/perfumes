import { fetchProducts } from "@/api/productAPI";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";

interface IUseProducts {
	categoryName?: string
	page?: number
	limit?: number
}

export function useProducts({ categoryName = '', page = 1, limit = 12 }: IUseProducts = {}) {
	const { data, isLoading, isError, error, isFetching } = useQuery({
		queryKey: ['products', categoryName, page, limit],
		queryFn: () => fetchProducts(categoryName, page, limit),
		staleTime: Infinity,
		placeholderData: keepPreviousData,
	})

	useEffect(() => {
		if (isError && error) {
			if (axios.isAxiosError(error)) {
				console.log(error.response?.data?.detail, 'error');
			} else {
				console.log(error.message, 'error');
			}
		}
	}, [isError])

	return { data, isLoading, isError, isFetching };
}
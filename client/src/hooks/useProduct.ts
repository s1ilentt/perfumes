import { fetchProduct } from "@/api/productAPI";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";

export function useProduct(id: number) {
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ['product', id],
		queryFn: () => fetchProduct(id)
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

	return { data, isLoading, isError };
}
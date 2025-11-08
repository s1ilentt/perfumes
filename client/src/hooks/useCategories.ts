import { fetchCategories } from "@/api/productAPI";
import { useQuery } from "@tanstack/react-query";

export function useCategories() {
	const { data, isLoading, isError } = useQuery({
		queryKey: ['categories'],
		queryFn: fetchCategories
	})

	return { data, isLoading, isError }
}
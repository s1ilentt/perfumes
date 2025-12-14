import { fetchProduct } from "@/api/productAPI";
import { ICartItem } from "@/types/cart-item.interface";
import { IProduct } from "@/types/product.interface";
import { ICartQueryResult } from "@/types/query-cart.interface";
import { useQueries, UseQueryResult } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";

export function useCartProducts(cart: ICartItem[]) {
	const queriesConfig = useMemo(() => {
		return (cart.map(item => ({
			queryKey: ['product', item.id],
			queryFn: () => fetchProduct(item.id),
			select: (product: IProduct) => ({
				...product,
				quantity: item.quantity
			})
		})))
	}, [cart]);

	const queries: UseQueryResult<ICartQueryResult, unknown>[] = useQueries({
		queries: queriesConfig
	})

	const result: ICartQueryResult[] = queries.map(item => item.data)
		.filter((item): item is ICartQueryResult => Boolean(item));

	const isError = queries.some(item => item.isError);

	const isLoading = queries.some(item => item.isLoading);

	useEffect(() => {
		if (isError) console.log('Error fetch product')
	}, [isError])

	return { result, isError, isLoading };
}
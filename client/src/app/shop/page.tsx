'use client'

import { useProducts } from "@/hooks/useProducts"

export default function ShopPage() {
	const {data} = useProducts();
	console.log(data)
	return <div>products</div>
}

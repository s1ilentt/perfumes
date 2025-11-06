import { IProduct } from "./product.interface";

export interface IProducts {
	page: number
	per_page: number
	total_items: number
	total_pages: number
	perfumes: IProduct[]
}
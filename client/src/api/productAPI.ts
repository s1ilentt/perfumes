import { IProducts } from '@/types/products.interface';
import { $host } from './config';
import { ICategory } from '@/types/category.interface';

export const fetchCategories = async () => {
	const { data } = await $host.get<ICategory[]>('api/v1/categories');
	return data
}

export const fetchProducts = async (category?: string, page?: number, limit?: number) => {
	const { data } = await $host.get<IProducts>('api/v1/perfumes', {
		params: {
			...(category ? { category } : {}),
			...(page ? { page } : {}),
			...(limit ? { 'per-page': limit } : {}),
		}
	});

	return data;
}
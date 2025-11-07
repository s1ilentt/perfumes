import { IProducts } from '@/types/products.interface';
import { $host } from './config';

export const fetchProducts = async (categoryName?: string) => {
	const { data } = await $host.get<IProducts>('api/v1/perfumes', {
		params: {
			...(categoryName ? { categoryName } : {})
		}
	});
	
	return data;
}
import { $host } from './config';

// Get all products with params 
export const fetchProducts = async () => {
	const { data } = await $host.get('api/v1/perfumes');
	return data;
}



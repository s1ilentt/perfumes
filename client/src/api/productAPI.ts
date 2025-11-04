import { $host } from './config';

export const fetchProducts = async () => {
	const { data } = await $host.get('api/v1/perfumes');
	return data;
}
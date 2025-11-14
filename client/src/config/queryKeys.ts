export const queryKeys = {
	products: (filters: { categoryName?: string; page?: number; limit?: number } = {}) => {
		const isEmptyFilters = Object.values(filters).every(v => v === undefined);

		return isEmptyFilters ? ['products'] as const : ['products', filters] as const;
	},
};
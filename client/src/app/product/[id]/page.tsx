import { Metadata } from 'next';
import { DiscoverMore } from './_sections/discover-more/DiscoverMore';
import { ProductDetail } from './_sections/product-detail/ProductDetail';
import { IProduct } from '@/types/product.interface';

type TProps = {
	params: { id: string };
};

export async function generateMetadata({ params }: TProps): Promise<Metadata> {
	const { id } = await params;

	const product: IProduct = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}api/v1/perfumes/${id}`,
		{ next: { revalidate: 300 } }
	).then(res => res.json());

	if (!product || !product.name) {
		return {
			description: 'Product not found'
		};
	}

	return {
		title: product.name ? product.name + ' - Parfumes' : '',
		description: product.description,
		openGraph: {
			title: product.name + ' - Parfumes',
			description: product.description,
			images: [
				{
					url: process.env.NEXT_PUBLIC_API_URL + product.photo,
					width: 1200,
					height: 630
				}
			]
		}
	};
}

export default function ProductPage() {
	return (
		<>
			<ProductDetail />
			<DiscoverMore />
		</>
	);
}

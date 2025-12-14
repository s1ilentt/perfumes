import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.scss';
import { Header } from '@/components/header/Header';
import { QueryProvider } from '@/providers/QueryProvider';
import { LocalStorageEventInit } from '@/components/localStorageEvent/LocalStorageEventInit';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchProducts } from '@/api/productAPI';
import dynamic from 'next/dynamic';

const Footer = dynamic(() => import('@/components/footer/Footer').then(mod => mod.Footer));

export const revalidate = 300;

const inter = Inter({
	variable: '--font-inter',
	subsets: ['latin'],
	display: 'swap'
});

export const metadata: Metadata = {
	title: 'Parfumes',
	description: 'Online perfume store',
	applicationName: 'Parfumes',
	icons: {
		icon: '/icons/favicon.ico'
	},
	openGraph: {
		type: 'website',
		siteName: 'Parfumes',
		title: 'Parfumes',
		description: 'Online perfume store',
		locale: 'en_US'
	},
	robots: {
		index: true,
		follow: true
	}
};

export default async function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery({
		queryKey: ['products', '', 1, 999],
		queryFn: () => fetchProducts('', 1, 999)
	});

	return (
		<html lang='en'>
			<body className={`${inter.variable} antialiased`}>
				<QueryProvider>
					<LocalStorageEventInit />
					<HydrationBoundary state={dehydrate(queryClient)}>
						<Header />
					</HydrationBoundary>
					<main>{children}</main>
					<Footer />
				</QueryProvider>
			</body>
		</html>
	);
}

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.scss';
import { Header } from '@/components/header/Header';
import { QueryProvider } from '@/providers/QueryProvider';
import { Footer } from '@/components/footer/Footer';
import { LocalStorageEventInit } from '@/components/localStorageEvent/LocalStorageEventInit';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchProducts } from '@/api/productAPI';

export const revalidate = 300;

const inter = Inter({
	variable: '--font-inter',
	subsets: ['latin'],
	display: 'swap',
});

export const metadata: Metadata = {
	title: 'Parfumes',
	description: 'Online parfume store',
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery({
		queryKey: ['products', '', 1, 999],
		queryFn: () => fetchProducts('', 1, 999)
	})
	
	return (
		<html lang='en'>
			<body className={`${inter.variable} antialiased`}>
				<QueryProvider>
					<LocalStorageEventInit />
					<HydrationBoundary state={dehydrate(queryClient)}>
						<Header />
					</HydrationBoundary>
					<main>
						{children}
					</main>
					<Footer />
				</QueryProvider>
			</body>
		</html>
	);
}

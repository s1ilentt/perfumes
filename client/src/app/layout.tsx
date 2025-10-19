import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.scss';
import { Header } from '@/components/header/Header';
import { QueryProvider } from '@/providers/QueryProvider';

const inter = Inter({
	variable: '--font-inter',
	subsets: ['latin'],
	display: 'swap',
});

export const metadata: Metadata = {
	title: 'Parfumes',
	description: 'Online parfume store',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={`${inter.variable} antialiased`}>
				<QueryProvider>
					<Header />
					<main style={{ marginTop: '100px' }}>
						<div className='container'>
							{children}
						</div>
					</main>
					<footer>
						<div className='container'>
						</div>
					</footer>
				</QueryProvider>
			</body>
		</html>
	);
}

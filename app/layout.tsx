import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: `বাংলাদেশ সিভিল সার্ভিস '৮৫ ফোরাম বার্ষিক পুনর্মিলনী ২০২৬ রেজিস্ট্রেশন`,
	description: `বাংলাদেশ সিভিল সার্ভিস '৮৫ ফোরাম বার্ষিক পুনর্মিলনী ২০২৬ এর অফিসিয়াল রেজিস্ট্রেশন পোর্টাল। এখানে আপনার তথ্য প্রদান করে পুনর্মিলনীে অংশগ্রহণের জন্য রেজিস্ট্রেশন করুন।`,
	openGraph: {
		title: `বাংলাদেশ সিভিল সার্ভিস '৮৫ ফোরাম বার্ষিক পুনর্মিলনী ২০২৬ রেজিস্ট্রেশন`,
		description: `বাংলাদেশ সিভিল সার্ভিস '৮৫ ফোরাম বার্ষিক পুনর্মিলনী ২০২৬ এর অফিসিয়াল রেজিস্ট্রেশন পোর্টাল। এখানে আপনার তথ্য প্রদান করে পুনর্মিলনীে অংশগ্রহণের জন্য রেজিস্ট্রেশন করুন।`,
		images: ['/logo.jpeg'],
		type: 'website',
		locale: 'en-us',
		url: `https://f85.mintapp.shop`,
		siteName: `বাংলাদেশ সিভিল সার্ভিস '৮৫ ফোরাম`,
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang='en'
			suppressHydrationWarning>
			<body className={inter.className}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}

'use client';

import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { StoreProvider } from '@/store/StoreProvider';
import { ThemeProvider } from 'next-themes';

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<StoreProvider>
			<ChakraProvider value={defaultSystem}>
				<ThemeProvider
					attribute='class'
					defaultTheme='light'
					enableSystem={false}
					disableTransitionOnChange>
					{children}
				</ThemeProvider>
			</ChakraProvider>
		</StoreProvider>
	);
}

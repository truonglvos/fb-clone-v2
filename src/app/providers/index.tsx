import type { ReactNode } from 'react';
import { AuthProvider } from './AuthProvider';
import { ThemeProvider } from './ThemeProvider';

interface RootProviderProps {
	children: ReactNode;
}

export function RootProvider({ children }: RootProviderProps) {
	return (
		<AuthProvider>
			<ThemeProvider>{children}</ThemeProvider>
		</AuthProvider>
	);
}

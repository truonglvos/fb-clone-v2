import { store } from '@app/store';
import type { ReactNode } from 'react';
import { Provider } from 'react-redux';

interface AuthProviderProps {
	children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
	return <Provider store={store}>{children}</Provider>;
}
